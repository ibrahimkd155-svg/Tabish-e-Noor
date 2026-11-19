# Tabish-e-Noor website + admin panel

## Files
- `index.html`: language selection (Dari, Pashto, English)
- `branches.html`: public school homepage with dynamic branch, news, gallery and social links
- `branch.html`: branch details
- `admin.html`: authenticated admin panel
- `admin.js`: login, branch editing, news and gallery management
- `site.js`, `branch.js`: public Supabase data loading
- `supabase-config.js`: project URL and publishable key (browser-safe; RLS must remain enabled)
- `style.css`, `extra.css`, `logo.jpeg`: design and school logo

## Deploy
Upload all files in this folder to the root of the GitHub repository and redeploy on Vercel. Do not place them inside a subfolder.

## Security
Never add a Supabase secret/service_role key to this project. Public data access and admin writes are controlled by Supabase RLS policies. Only users listed in `public.admins` should be able to manage content.

## Notes
The site shows only active branches from the database. The initial confirmed branch information is already inserted. Manager and phone are blank until verified.
