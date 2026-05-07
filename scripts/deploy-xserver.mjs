import fs from "node:fs/promises";
import path from "node:path";
import { Client } from "basic-ftp";

const distDir = path.resolve(process.cwd(), "dist");
const sftpConfigPath = path.resolve(process.cwd(), ".vscode", "sftp.json");

function toPosixPath(value) {
  return value.replace(/\\/g, "/");
}

function joinRemotePath(...parts) {
  return parts
    .filter(Boolean)
    .map((part, index) => {
      const normalized = toPosixPath(String(part));
      if (index === 0) {
        return normalized.replace(/\/+$/, "");
      }

      return normalized.replace(/^\/+|\/+$/g, "");
    })
    .filter(Boolean)
    .join("/");
}

async function readLocalConfig() {
  try {
    const rawConfig = await fs.readFile(sftpConfigPath, "utf8");
    return JSON.parse(rawConfig);
  } catch {
    return {};
  }
}

async function getConfig() {
  const localConfig = await readLocalConfig();

  return {
    host: process.env.XSERVER_FTP_SERVER || localConfig.host,
    port: Number(process.env.XSERVER_FTP_PORT || localConfig.port || 21),
    user: process.env.XSERVER_FTP_USERNAME || localConfig.username,
    password: process.env.XSERVER_FTP_PASSWORD || localConfig.password,
    remotePath: process.env.XSERVER_FTP_REMOTE_PATH || localConfig.remotePath,
  };
}

async function listFiles(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await listFiles(entryPath)));
    } else if (entry.isFile()) {
      files.push(entryPath);
    }
  }

  return files;
}

async function ensureRemoteDir(client, remoteDir) {
  await client.ensureDir(remoteDir);
}

async function uploadDist(client, remoteRoot) {
  const files = await listFiles(distDir);
  let uploaded = 0;
  const remoteDirs = new Set();

  for (const file of files) {
    const relativePath = toPosixPath(path.relative(distDir, file));
    const remoteFile = joinRemotePath(remoteRoot, relativePath);
    const remoteDir = remoteFile.split("/").slice(0, -1).join("/");

    if (!remoteDirs.has(remoteDir)) {
      await ensureRemoteDir(client, remoteDir);
      remoteDirs.add(remoteDir);
    }

    await client.uploadFrom(file, remoteFile);
    uploaded += 1;
  }

  return { uploaded, files };
}

async function deleteStaleAssets(client, remoteRoot, files) {
  const localAssetFiles = new Set(
    files
      .map((file) => toPosixPath(path.relative(distDir, file)))
      .filter((relativePath) => relativePath.startsWith("assets/"))
      .map((relativePath) => relativePath.replace(/^assets\//, "")),
  );
  const remoteAssetsDir = joinRemotePath(remoteRoot, "assets");
  let deleted = 0;

  try {
    const remoteEntries = await client.list(remoteAssetsDir);

    for (const entry of remoteEntries) {
      if (entry.isFile && !localAssetFiles.has(entry.name)) {
        await client.remove(joinRemotePath(remoteAssetsDir, entry.name));
        deleted += 1;
      }
    }
  } catch (error) {
    console.warn(`Skipping stale asset cleanup: ${error.message}`);
  }

  return deleted;
}

async function main() {
  const config = await getConfig();

  for (const key of ["host", "user", "password", "remotePath"]) {
    if (!config[key]) {
      throw new Error(`Missing FTP config: ${key}`);
    }
  }

  const client = new Client();
  client.ftp.verbose = false;

  try {
    await client.access({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      secure: false,
    });

    const remoteRoot = toPosixPath(config.remotePath).replace(/\/+$/, "");
    const { uploaded, files } = await uploadDist(client, remoteRoot);
    const deletedStaleAssets = await deleteStaleAssets(client, remoteRoot, files);

    console.log(
      JSON.stringify(
        {
          uploaded,
          deletedStaleAssets,
          remoteRoot,
        },
        null,
        2,
      ),
    );
  } catch (error) {
    try {
      const currentDir = await client.pwd();
      const entries = await client.list();
      console.error(
        JSON.stringify(
          {
            ftpCurrentDir: currentDir,
            ftpVisibleEntries: entries.map((entry) => entry.name).slice(0, 30),
          },
          null,
          2,
        ),
      );
    } catch (diagnosticError) {
      console.error(`FTP diagnostics failed: ${diagnosticError.message}`);
    }

    throw error;
  } finally {
    client.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
