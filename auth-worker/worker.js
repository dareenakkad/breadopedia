// Breadopedia editor login — a tiny GitHub OAuth relay for Decap CMS.
// Runs as its own Cloudflare Worker. Needs two secrets: GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET.
// Flow: /admin opens /auth → GitHub asks the editor to sign in → GitHub sends them to /callback → the token is handed back to the editor window.

const html = (body) => new Response(`<!doctype html><meta charset="utf-8"><title>Breadopedia login</title>${body}`, {
  headers: { 'content-type': 'text/html; charset=utf-8', 'cache-control': 'no-store' },
});

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const origin = url.origin;

    if (url.pathname === '/auth') {
      const state = crypto.randomUUID();
      const gh = new URL('https://github.com/login/oauth/authorize');
      gh.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      gh.searchParams.set('redirect_uri', `${origin}/callback`);
      gh.searchParams.set('scope', 'repo,user');
      gh.searchParams.set('state', state);
      return new Response(null, {
        status: 302,
        headers: { location: gh.toString(), 'set-cookie': `oauth_state=${state}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600` },
      });
    }

    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');
      const cookieState = (request.headers.get('cookie') || '').match(/oauth_state=([^;]+)/)?.[1];
      if (!code || !state || state !== cookieState) return html('<p>Login check failed. Close this window and try again.</p>');

      const res = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { accept: 'application/json', 'content-type': 'application/json', 'user-agent': 'breadopedia-auth' },
        body: JSON.stringify({ client_id: env.GITHUB_CLIENT_ID, client_secret: env.GITHUB_CLIENT_SECRET, code, redirect_uri: `${origin}/callback` }),
      });
      const data = await res.json();
      const ok = Boolean(data.access_token);
      const payload = ok ? { token: data.access_token, provider: 'github' } : { error: data.error_description || data.error || 'unknown error' };
      const msg = `authorization:github:${ok ? 'success' : 'error'}:${JSON.stringify(payload)}`;
      // Decap listens for this handshake from the window it opened.
      return html(`<p>${ok ? 'Signed in. You can close this window.' : 'Login failed: ' + payload.error}</p>
<script>
  (function () {
    function receive(e) {
      window.opener.postMessage(${JSON.stringify(msg)}, e.origin);
      window.removeEventListener('message', receive, false);
    }
    window.addEventListener('message', receive, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
</script>`);
    }

    return html('<p>Breadopedia login service.</p>');
  },
};
