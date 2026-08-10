# RTT online account deployment

RTT Web, Android, and Windows use Supabase email/password authentication and GitHub OAuth. If Supabase is unavailable or no valid session exists, the workspace stays locked; RTT does not provide offline accounts.

## Connect a project

```powershell
F:\tools\supabase-cli\supabase.exe login
F:\tools\supabase-cli\supabase.exe link --project-ref <project-ref> --workdir F:\RTT
F:\tools\supabase-cli\supabase.exe db push --workdir F:\RTT
```

The migration creates `profiles`, `user_preferences`, and `capability_profiles` with per-user RLS. Only non-secret profile metadata may be synchronized. Never store API keys, passwords, model files, audio, captions, or translated text in these tables.

## Web environment

```text
PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
PUBLIC_SUPABASE_ANON_KEY=<publishable-anon-key>
RTT_SITE_URL=https://rtt.jenseny.top
```

Use only the public publishable/anon key in the browser. Never expose a `service_role` key.

Set the Auth Site URL to `https://rtt.jenseny.top/app/`. Add `/app/**` and `/en/app/**` for `rtt.jenseny.top`, `rtt.jenseny.cn`, and the GitHub Pages fallback to the redirect allow list. The wildcard is required for email verification, GitHub OAuth, and password-recovery query parameters.

## GitHub OAuth

Create a GitHub OAuth App with this callback URL:

```text
https://<project-ref>.supabase.co/auth/v1/callback
```

Enable the GitHub provider in Supabase and store the client secret only in Supabase or CI secrets.

## Acceptance checks

1. Register with email and finish email verification.
2. Sign in with GitHub and return to both custom-domain workspaces.
3. Change the display name and confirm it is restored on Web, Android, and Windows.
4. Start password recovery from each client and confirm the email link opens the Web new-password form.
5. Confirm one user cannot read or change another user's profiles and that no API key, model file, audio, caption, or translation body is stored in account tables.
