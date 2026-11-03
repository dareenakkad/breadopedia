# Editor login (auth-worker)

A separate, free Cloudflare Worker that lets Decap CMS at `/admin` sign in with GitHub.
It holds no content; it only relays the GitHub login handshake. It asks GitHub for `public_repo`
(this repository only) and hands the token to `https://breadopedia.org` and nowhere else.

## One-time setup

1. **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App**
   - Application name: `Breadopedia editor`
   - Homepage URL: `https://breadopedia.org`
   - Authorization callback URL: `https://auth.breadopedia.org/callback`
   - Create, then **Generate a new client secret**. Keep the Client ID and the secret for step 3.
2. **Cloudflare → Workers & Pages → Create → Start with Hello World**, name it `breadopedia-auth`, deploy,
   then **Edit code**, replace everything with `worker.js` from this folder, and deploy again.
3. **Worker → Settings → Variables and Secrets**: add `GITHUB_CLIENT_ID` (plain) and `GITHUB_CLIENT_SECRET` (secret).
4. **Worker → Settings → Domains & Routes → Add → Custom domain**: `auth.breadopedia.org`.
5. Open `https://breadopedia.org/admin` → **Login with GitHub**.

If the Worker ends up on a different address, change `base_url` in `public/admin/config.yml` and the
callback URL in the GitHub OAuth app to match.
