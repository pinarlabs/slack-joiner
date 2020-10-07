import React, { useState } from "react";
import Head from 'next/head'
import * as txt from './index.json';


export default function SlackForm() {
  const [email, setEmail] = useState("");
  const [end, setEnd] = useState(false);
  const [result, setResult]: [any, any] = useState({});
  const divStyle = {
    color: '#e25555' 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const submitButton  = document.getElementById("invite") as HTMLInputElement;

    submitButton.value = txt.form.submitLoading;
    submitButton.disabled = true;
    const fullUrl = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
    const result = await fetch(`${fullUrl}/api/invite/${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `captcha=${grecaptcha.getResponse()}`
    });
    const resultJSON = await result.json();
    setEnd(true);
    setResult(resultJSON);
  }

  const resetState = async () => {
    setEmail("");
    setEnd(false);
    setResult({});
  }
  if (end) {
    if (result.ok) {
      return (
      <div className="confirmation-dialog"><p>{txt.dialog.ok}</p><a href="#"  onClick={resetState}>{txt.dialog.back}</a></div>
      );
    }
    return (<div className="confirmation-dialog"><p>{result.error === undefined ? "" : result.error.replaceAll("_", " ")}</p><a href="#" onClick={resetState}>{txt.dialog.back}</a></div>);
  } else {
    return (
      <>
        <Head>
          <script src="https://www.google.com/recaptcha/api.js" async defer></script>
          <link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Ubuntu:regular,bold&subset=Latin"></link>
          <title>{txt.welcomeMessage}</title>
        </Head>
        <form onSubmit={handleSubmit}>
          <div className="form-container">
          <p>{txt.welcomeMessage}</p>
            <div id="g-recaptcha-container">
              <div className="g-recaptcha" data-sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY}></div>
            </div>
          
            <div>
              <input
                type="email"
                id="email"
                placeholder={txt.form.emailMessage}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input id="invite" type="submit" value={txt.form.submitMessage} disabled={ email === "" }/>
            </div>
          </div>
          <div className="madewith">made with <span style={divStyle}>&#9829;</span> by <a target="_blank" href="https://github.com/pinarlabs/slack-joiner">pinarlabs</a></div>
        </form>
      </>

    );
  }

}