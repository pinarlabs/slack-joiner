export default async function invite(req, res) {
  try {
    const googleUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.GOOGLE_RECAPTCHA_SECRET}&response=${req.body.captcha}`; 
    const captchaResponse: any = await fetch(googleUrl); 
    const captchaRepsonseJSON: any = await captchaResponse.json();
    if (!(captchaRepsonseJSON.success)) {
      res.json({
        ok: false,
        error: 'Captcha Error'
      });
      return;
    }
    const {
      query: { email }
    } = req;
    
    const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `${process.env.SLACK_TOKEN}`
      },
      body: `email=${email}`
    };
    const response  = await fetch('https://testingar.slack.com/api/users.admin.invite', options);
    const result = await response.json();
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(error.status || 400).end({ok: false, message: error.message});
  }
}