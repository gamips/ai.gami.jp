param(
    [ValidateSet('sites', 'query', 'freshness')]
    [string] $Action = 'query',

    [string] $SiteUrl = 'sc-domain:ai.gami.jp',
    [string] $QuotaProject,
    [string] $StartDate,
    [string] $EndDate,
    [string[]] $Dimensions = @('query'),
    [int] $RowLimit = 25,
    [int] $StartRow = 0,
    [ValidateSet('web', 'image', 'video', 'news', 'googleNews', 'discover')]
    [string] $SearchType = 'web',
    [ValidateSet('final', 'all')]
    [string] $DataState = 'final',
    [int] $FreshnessLookbackDays = 14,
    [string] $Dimension,
    [ValidateSet('contains', 'equals', 'notContains', 'notEquals', 'includingRegex', 'excludingRegex')]
    [string] $Operator = 'contains',
    [string] $Expression,
    [ValidateSet('clicks', 'impressions', 'ctr', 'position')]
    [string] $SortBy = 'impressions',
    [ValidateSet('asc', 'desc')]
    [string] $SortDirection = 'desc',
    [switch] $Raw
)

Set-StrictMode -Version Latest
$ErrorActionPreference = 'Stop'

function Read-JsonFile([string] $Path) {
    if (-not (Test-Path -LiteralPath $Path)) {
        return $null
    }

    try {
        return Get-Content -LiteralPath $Path -Raw | ConvertFrom-Json
    } catch {
        return $null
    }
}

function Get-AdcPathCandidates {
    $Candidates = @(
        (Join-Path $env:APPDATA 'gcloud\application_default_credentials.json'),
        (Join-Path $env:USERPROFILE '.codex\credentials\gsc-adc.json')
    )

    return $Candidates | Select-Object -Unique
}

function Read-AdcCredentials {
    foreach ($Path in Get-AdcPathCandidates) {
        $Adc = Read-JsonFile $Path
        if ($Adc) {
            return [pscustomobject]@{
                Path = $Path
                Adc = $Adc
            }
        }
    }

    return $null
}

function Get-QuotaProject {
    if ($QuotaProject) {
        return $QuotaProject
    }

    $AdcInfo = Read-AdcCredentials
    if ($AdcInfo -and $AdcInfo.Adc -and $AdcInfo.Adc.quota_project_id) {
        return [string] $AdcInfo.Adc.quota_project_id
    }

    return $null
}

function Get-AccessTokenFromAuthorizedUser([object] $Adc) {
    if (-not $Adc.client_id -or -not $Adc.client_secret -or -not $Adc.refresh_token) {
        throw 'Google ADC is missing client_id, client_secret, or refresh_token.'
    }

    $Body = @{
        client_id = [string] $Adc.client_id
        client_secret = [string] $Adc.client_secret
        refresh_token = [string] $Adc.refresh_token
        grant_type = 'refresh_token'
    }

    $Token = Invoke-RestMethod -Method Post -Uri 'https://oauth2.googleapis.com/token' -Body $Body -TimeoutSec 60
    if (-not $Token -or -not $Token.access_token) {
        throw 'Failed to refresh the Google access token.'
    }

    return [string] $Token.access_token
}

function Get-AccessToken {
    $AdcInfo = Read-AdcCredentials
    if (-not $AdcInfo -or -not $AdcInfo.Adc) {
        throw 'Google application default credentials were not found.'
    }

    if ($AdcInfo.Adc.type -eq 'authorized_user') {
        return Get-AccessTokenFromAuthorizedUser $AdcInfo.Adc
    }

    throw "Unsupported Google ADC type: $($AdcInfo.Adc.type)."
}

function Get-GscHeaders {
    $Headers = @{
        Authorization = 'Bearer ' + (Get-AccessToken)
    }

    $Quota = Get-QuotaProject
    if ($Quota) {
        $Headers['x-goog-user-project'] = $Quota
    }

    return $Headers
}

function Invoke-GscApi {
    param(
        [Parameter(Mandatory = $true)] [string] $Method,
        [Parameter(Mandatory = $true)] [string] $Uri,
        [object] $Body
    )

    $Headers = Get-GscHeaders
    $Parameters = @{
        Method = $Method
        Uri = $Uri
        Headers = $Headers
        TimeoutSec = 60
    }

    if ($null -ne $Body) {
        $Headers['Content-Type'] = 'application/json'
        $Parameters['Body'] = ($Body | ConvertTo-Json -Depth 20)
        $Parameters['ContentType'] = 'application/json; charset=utf-8'
    }

    return Invoke-RestMethod @Parameters
}

function Write-Result($Value) {
    if ($Raw) {
        $Value
    } else {
        $Value | ConvertTo-Json -Depth 30
    }
}

switch ($Action) {
    'sites' {
        Write-Result (Invoke-GscApi -Method 'GET' -Uri 'https://searchconsole.googleapis.com/webmasters/v3/sites')
    }

    'query' {
        if (-not $EndDate) {
            $EndDate = (Get-Date).Date.AddDays(-3).ToString('yyyy-MM-dd')
        }
        if (-not $StartDate) {
            $StartDate = ([datetime]::ParseExact($EndDate, 'yyyy-MM-dd', $null)).AddDays(-27).ToString('yyyy-MM-dd')
        }

        $Body = @{
            startDate = $StartDate
            endDate = $EndDate
            dimensions = @($Dimensions)
            rowLimit = $RowLimit
            startRow = $StartRow
            searchType = $SearchType
            dataState = $DataState
        }

        if ($Dimension -and $Expression) {
            $Body['dimensionFilterGroups'] = @(
                @{
                    groupType = 'and'
                    filters = @(
                        @{
                            dimension = $Dimension
                            operator = $Operator
                            expression = $Expression
                        }
                    )
                }
            )
        }

        $EncodedSite = [System.Uri]::EscapeDataString($SiteUrl)
        $Uri = "https://searchconsole.googleapis.com/webmasters/v3/sites/$EncodedSite/searchAnalytics/query"
        $Result = Invoke-GscApi -Method 'POST' -Uri $Uri -Body $Body

        [object[]] $Rows = @()
        if ($Result.PSObject.Properties['rows']) {
            $Rows = @($Result.rows)
        }
        if ($Rows.Count -gt 0) {
            $Rows = $Rows | Sort-Object -Property $SortBy -Descending:($SortDirection -eq 'desc')
        }

        Write-Result ([pscustomobject]@{
            siteUrl = $SiteUrl
            startDate = $StartDate
            endDate = $EndDate
            dimensions = @($Dimensions)
            searchType = $SearchType
            dataState = $DataState
            rowCount = $Rows.Count
            rows = $Rows
            metadata = if ($Result.PSObject.Properties['metadata']) { $Result.metadata } else { $null }
        })
    }

    'freshness' {
        if (-not $EndDate) {
            $EndDate = (Get-Date).Date.ToString('yyyy-MM-dd')
        }
        if (-not $StartDate) {
            $StartDate = ([datetime]::ParseExact($EndDate, 'yyyy-MM-dd', $null)).
                AddDays(-1 * [Math]::Max(1, $FreshnessLookbackDays)).
                ToString('yyyy-MM-dd')
        }

        $RequestedStart = [datetime]::ParseExact($StartDate, 'yyyy-MM-dd', $null)
        $RequestedEnd = [datetime]::ParseExact($EndDate, 'yyyy-MM-dd', $null)
        $RequestedSpanDays = [int] (($RequestedEnd - $RequestedStart).TotalDays + 1)
        $Body = @{
            startDate = $StartDate
            endDate = $EndDate
            dimensions = @('date')
            rowLimit = [Math]::Min(25000, [Math]::Max(1, $RequestedSpanDays))
            startRow = 0
            searchType = $SearchType
            dataState = $DataState
        }

        $EncodedSite = [System.Uri]::EscapeDataString($SiteUrl)
        $Uri = "https://searchconsole.googleapis.com/webmasters/v3/sites/$EncodedSite/searchAnalytics/query"
        $Result = Invoke-GscApi -Method 'POST' -Uri $Uri -Body $Body

        [object[]] $Rows = @()
        if ($Result.PSObject.Properties['rows']) {
            $Rows = @($Result.rows) | Sort-Object { [string] $_.keys[0] }
        }

        $LatestReturnedDate = $null
        $CurrentStartDate = $null
        $PreviousStartDate = $null
        $PreviousEndDate = $null
        $LagDays = $null

        if ($Rows.Count -gt 0) {
            $LatestReturnedDate = [string] $Rows[-1].keys[0]
            $LatestDate = [datetime]::ParseExact($LatestReturnedDate, 'yyyy-MM-dd', $null)
            $CurrentStartDate = $LatestDate.AddDays(-27).ToString('yyyy-MM-dd')
            $PreviousStartDate = $LatestDate.AddDays(-55).ToString('yyyy-MM-dd')
            $PreviousEndDate = $LatestDate.AddDays(-28).ToString('yyyy-MM-dd')
            $LagDays = [int] ($RequestedEnd - $LatestDate).TotalDays
        }

        Write-Result ([pscustomobject]@{
            siteUrl = $SiteUrl
            requestedStartDate = $StartDate
            requestedEndDate = $EndDate
            searchType = $SearchType
            dataState = $DataState
            latestReturnedDate = $LatestReturnedDate
            lagDaysFromRequestedEnd = $LagDays
            currentWindow = if ($LatestReturnedDate) {
                [pscustomobject]@{
                    startDate = $CurrentStartDate
                    endDate = $LatestReturnedDate
                }
            } else {
                $null
            }
            previousWindow = if ($LatestReturnedDate) {
                [pscustomobject]@{
                    startDate = $PreviousStartDate
                    endDate = $PreviousEndDate
                }
            } else {
                $null
            }
            rowCount = $Rows.Count
            rows = $Rows
            metadata = if ($Result.PSObject.Properties['metadata']) { $Result.metadata } else { $null }
        })
    }
}
