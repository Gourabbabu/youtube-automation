# YouTube Automation Dashboard

This is a custom, AI-powered Next.js application built specifically for Gourab's Gaming Channel.

## How to Deploy to Vercel (Cloud Hosting)

Since Node.js is not installed locally on this machine, follow these simple steps to deploy your dashboard directly to the cloud for free:

1. **Upload to GitHub:**
   - Create a free [GitHub](https://github.com/) account if you don't have one.
   - Create a new repository named `youtube-automation`.
   - Upload all the files inside this `youtube-automation` folder to that repository (you can just drag and drop them on the GitHub website).

2. **Deploy to Vercel:**
   - Go to [Vercel](https://vercel.com/) and sign in with your GitHub account.
   - Click "Add New..." -> "Project".
   - Import your `youtube-automation` GitHub repository.
   - Expand the **Environment Variables** section and add the following:
     - `GEMINI_API_KEY` : (Your Gemini API key)
     - `DISCORD_WEBHOOK_URL` : (Create a webhook in your Discord server channel settings and paste the URL here)
     - `CRON_SECRET` : (Any random password to secure your cron job)
   - Click **Deploy**.

3. **Setup Daily Cron Job (6 PM Notification):**
   - After deploying, go to your Vercel project dashboard.
   - Go to Settings -> Cron Jobs.
   - You can create a `vercel.json` file in your repo (I've included it) to automatically ping `/api/cron/daily` at 6 PM (12:30 PM UTC).

Once deployed, you will have a live URL to access your premium dashboard from anywhere, and Discord will ping you at 6 PM!
