# Slack Joiner

This application solves the problem to allow your community users(slack) to auto invite.

![](./docs/slack-joiner.gif)

## Run and Debug Locally

```
npm run dev
```

## Deployment

The deployment is straightforward via [vercel](https://vercel.com):

1. Fork this repository
1. Create a [google captcha v2](https://www.google.com/recaptcha/admin) key and secret
1. Get the info you need to run this app: `SLACK_TOKEN`, `GOOGLE_RECAPTCHA_SECRET`, `NEXT_PUBLIC_RECAPTCHA_KEY` 
1. Deploy Button and fill the environment variables setup

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fpinarlabs%2Fslack-joiner&env=SLACK_TOKEN,GOOGLE_RECAPTCHA_SECRET,NEXT_PUBLIC_RECAPTCHA_KEY
)


If you want to config your wording on the app just update the index.json texts:
```
{
    "welcomeMessage": "Welcome to X Community Slack",
    "form": {
        "emailMessage": "Email to join",
        "submitMessage": "Request Invitation",
        "submitLoading": "...Loading"
    },
    "dialog": {
        "ok": "Invite Sent",
        "back": "Back"
    }
}
```