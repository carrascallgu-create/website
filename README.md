# Tidepool landing page

Static HTML + one serverless function. No build step.

## Deploy
1. `npm i -g vercel` then run `vercel` in this folder (or push to GitHub and import the repo at vercel.com/new).
2. Framework preset: **Other**. Leave build command and output directory empty.

## Collect signups
Signups are logged in Vercel > your project > Logs. To forward them, add an env var
`WEBHOOK_URL` (Slack incoming webhook, Zapier, Make, etc.) in Project Settings > Environment Variables, then redeploy.

## Customize
Edit copy, colors (the `:root` variables) and the name in `index.html`.
