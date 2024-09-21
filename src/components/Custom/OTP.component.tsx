// prettier-ignore
import React from "react";
import { Button, Input } from "@mui/material"
import {getOTPCallsSnippet} from "../../utils/Custom/OTPCalls";

const OTP: React.FC<any> = () => {
  const [otpFirst, setOtpFirst] = React.useState("");
  const [otpSecond, setOtpSecond] = React.useState("");
  const [retriesTimeout, setRetriesTimeout] = React.useState(false);
  const [servResp, setServResp] = React.useState("");

  function resendOTP() {
    setRetriesTimeout(true);
    setTimeout(() => {
      setRetriesTimeout(false);
    }, 5000);
    getOTPCallsSnippet();
  }

  async function submitToServer () {
    fetch("http://localhost:3000/whatever", {})
      .then((res) => { 
          // @ts-ignore
          if (typeof res.my != "undefined") {
            // @ts-ignore
            setServResp(res.my);
          }
        });
  }

  return <div>
    <h1>One-Time-Password</h1>
    <div>
      <Input placeholder="000" data-testid="input-wrapper" onChange={(ev) => {setOtpFirst(ev.target.value)}}></Input>
      <Input placeholder="000" onChange={(ev) => {setOtpSecond(ev.target.value)}} style={{textAlign:"center"}}></Input>
    </div>
    <Button 
      disabled={otpFirst.length != 3 || otpSecond.length != 3} 
      onClick={submitToServer}
    >Submit</Button>
    <p data-testid="serverResp">{servResp}</p>
    <div>
      <span>Not received?</span>
      <Button onClick={resendOTP} disabled={retriesTimeout}>Resend OTP?</Button>
    </div>
  </div>;
};
export default OTP;

