interface ComposeOptions {
  to: string;
  subject?: string;
  body?: string;
}

const qs = (params: Record<string, string | undefined>) =>
  Object.entries(params)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}=${encodeURIComponent(v as string)}`)
    .join('&');

/**
 * Opens a Gmail compose window. Must be called from a click handler.
 * - Android: opens the Gmail app (falls back to Gmail on the web if it isn't installed)
 * - iOS: opens the Gmail app via its URL scheme (falls back to the default mail app)
 * - Desktop: opens Gmail on the web in a new tab
 */
export function openGmailCompose({ to, subject, body }: ComposeOptions) {
  const ua = navigator.userAgent;
  const isAndroid = /Android/i.test(ua);
  const isIOS = /iPhone|iPad|iPod/i.test(ua);

  const webUrl = `https://mail.google.com/mail/?${qs({ view: 'cm', fs: '1', to, su: subject, body })}`;
  const mailtoUrl = `mailto:${to}?${qs({ subject, body })}`;

  if (isAndroid) {
    const fallback = encodeURIComponent(webUrl);
    window.location.href =
      `intent:${to}?${qs({ subject, body })}#Intent;scheme=mailto;package=com.google.android.gm;` +
      `S.browser_fallback_url=${fallback};end`;
    return;
  }

  if (isIOS) {
    window.location.href = `googlegmail:///co?${qs({ to, subject, body })}`;
    // If the Gmail app isn't installed the page stays visible; fall back to the default mail app.
    setTimeout(() => {
      if (!document.hidden) window.location.href = mailtoUrl;
    }, 1000);
    return;
  }

  window.open(webUrl, '_blank', 'noopener,noreferrer');
}
