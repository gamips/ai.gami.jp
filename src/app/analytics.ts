const MEASUREMENT_ID = "G-XKDVF7NPH4";

type PageFields = {
  page_location: string;
  page_title: string;
  page_referrer: string;
};

declare global {
  interface Window {
    dataLayer?: IArguments[];
    gtag?: (...args: unknown[]) => void;
  }
}

let previousPage: PageFields | undefined;

export function trackPageView(pageLocation: string, pageTitle: string) {
  if (window.location.hostname !== "ai.gami.jp" || previousPage?.page_location === pageLocation) {
    return;
  }

  const fields: PageFields = {
    page_location: pageLocation,
    page_title: pageTitle,
    page_referrer: previousPage?.page_location || (document.referrer ? new URL(document.referrer).origin : ""),
  };

  if (!previousPage) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer!.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("set", fields);
    window.gtag("config", MEASUREMENT_ID, { send_page_view: false });

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
    document.head.appendChild(script);
  } else {
    window.gtag?.("set", fields);
  }

  window.gtag?.("event", "page_view", fields);
  previousPage = fields;
}

export function trackSuccessfulInquiry() {
  if (previousPage) {
    window.gtag?.("event", "generate_lead", previousPage);
  }
}
