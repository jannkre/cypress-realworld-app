// // prettier-ignore
// // es-lint-ignore
// import React from "react";
// import { Button, Input } from "@mui/material"
// import {getOTPCallsSnippet} from "../../utils/Custom/OTPCalls";
// import axios from "axios";
// import { useStore } from "../../utils/Custom/Store";

// const OTP: React.FC<any> = ({ defaultData }) => {
//   const { count, increment } = (useStore() as any);
//   const [otpFirst, setOtpFirst] = React.useState("");
//   const [otpSecond, setOtpSecond] = React.useState("");
//   const [retriesTimeout, setRetriesTimeout] = React.useState(false);
//   const [servResp, setServResp] = React.useState("");

//   async function resendOTP() {
//     setRetriesTimeout(true);
//     setTimeout(() => {
//       setRetriesTimeout(false);
//     }, 3000);
//     console.log(await getOTPCallsSnippet("33"));
//   }

//   async function submitToServer () {
//     increment();
//     axios.get("http://localhost:3000", {}).then((res) => {
//       console.log('logged');
//       setServResp('logged');
//     }).catch(() => {});
//     return;
//     fetch("http://localhost:3000/whatever", {})
//       .then((res) => { 
//           // @ts-ignore
//           setServResp(res.data.token);
//           // if (typeof res.my != "undefined") {
//           //   // @ts-ignore
//           //   setServResp(res.my);
//           // }
//         })
//         .catch((err) => {
//           setServResp(err.message);
//         });
//       // fetch("http://localhost:3000/whatever", {})
//       //   .then((res) => { 
//       //       // @ts-ignore
//       //       if (typeof res.my2 != "undefined") {
//       //         // @ts-ignore
//       //         setServResp(res.my2);
//       //       }
//       //   })
//       //   .catch((err) => {
//       //     setServResp(err.message);
//       //   });
//   }



//   return <div style={{paddingTop:'50px'}}>
//     <h1 style={{textAlign: "center"}}>One-Time-Password</h1>
//     <p style={{textAlign: "center"}}>Enter the OTP sent to your phone</p>
//     <p>Login Counter: {count}</p>
//     <div>
//       <Input placeholder="000" data-testid="input-wrapper" style={{marginRight:20}} onChange={(ev) => {setOtpFirst(ev.target.value)}} sx={{textAlign: "center"}}></Input>
//       <Input placeholder="000" onChange={(ev) => {setOtpSecond(ev.target.value)}} sx={{textAlign:"center"}}></Input>
//     </div>
//     <Button 
//       variant="contained"
//       disabled={otpFirst.length != 3 || otpSecond.length != 3} 
//       onClick={submitToServer}
//       style={{marginTop: "10px"}}
//     >Submit</Button>
//     <p data-testid="serverResp">{servResp}</p>
//     <div>
//       <span>No notification received?</span>
//       <Button onClick={resendOTP} disabled={retriesTimeout}>Resend OTP?</Button>
//     </div>
//     {defaultData != undefined && <p>{defaultData.name}</p>}
//   </div>;
// };
// export default OTP;

