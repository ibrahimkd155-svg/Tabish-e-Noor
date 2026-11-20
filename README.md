# Tabish-e-Noor website + admin panel

## Public flow
1. Cinematic logo intro using the school's supplied logo.
2. Language selection: Dari (`fa`), Pashto (`ps`), and English (`en`).
3. Three branch cards remain visible.
4. Branch detail page reads the selected branch from Supabase.

## Admin panel
- Supabase email/password authentication.
- Authorization checks the signed-in user's UUID in `public.admins.user_id`.
- Manage the three branch records, announcements, and gallery media.
- Branch names, announcement title/content, and gallery captions are entered separately in all three languages.
- Branch address, phone, grades, hours, and manager fields remain text columns in the current database schema; those values are displayed as entered.

## Database mapping verified from the supplied Supabase column listing
- `public.branches`: `id`, `name` (JSONB), `address`, `phone`, `morning_hours`, `afternoon_hours`, `grades`, `manager`, `is_active`, `sort_order`, `created_at`, plus `manager_morning` and `manager_afternoon` added by the user.
- `public.admins`: `user_id`, `role`, `created_at`.
- `public.announcemer`: `id`, `title` (JSONB), `content` (JSONB), `is_published`, `created_at`.
- `public.gallery`: `id`, `media_url`, `media_type`, `caption` (JSONB), `is_visible`, `created_at`.
- Gallery uploads use the existing `school-media` Storage bucket.

## Deploy
Upload the project files to the root of the GitHub repository and redeploy on Vercel. The Supabase project URL and browser publishable key are in `supabase-config.js`.

## Security notes
Never put a Supabase secret/service-role key in frontend code. Database and Storage access must remain protected by Supabase RLS and Storage policies. The frontend authorization check is not a substitute for RLS. The same authorized email account can be used by both school administrators as requested.

## Important
The announcements table is intentionally spelled `announcemer` because that is the exact existing table name in the live database shared by the user. Do not rename it without a planned database migration and matching code change.
