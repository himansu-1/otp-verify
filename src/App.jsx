import "./App.css";
import { FaPhoneAlt } from "react-icons/fa";
import { CgSpinnerAlt } from "react-icons/cg";
import OtpInput from "otp-input-react";
import { useState,useEffect } from "react";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css'
import {auth} from "./firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [otp, setOtp] = useState("");
  const [ph, setph] = useState("");
  const [showOpt, setshowOpt] = useState(false);
  const [loading, setloading] = useState(false);
  const [user, setuser] = useState(null);

  function onCaptchVerify(){
    if (!window.recaptchaVerifier ) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
          onSignup()
          // return
        },
        'expired-callback': () => {}
      });
    }
  }
  function onSignup(){
    if (ph.length == 12) {      
      setloading(true)
      onCaptchVerify()

      const appVerifier = window.recaptchaVerifier

      const formatPh = "+"+ph

      signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {      
        window.confirmationResult = confirmationResult;
        setloading(false)
        setshowOpt(true)
        toast.success("OTP sended  Successfully")
      }).catch((error) => {
        console.log(error)
        setloading(false)
      });
    }else{toast("Enter a valid Number")}
  }

  function OTPverify(){
    setloading(true)
    window.confirmationResult.confirm(otp).then(async(res)=>{
      console.log(res)
      setuser(res.user)
      setloading(false)
    }).catch(error=>{
      console.log(error);
      setloading(false)
      toast("Invalid...")
    })
  }
  useEffect(() => {
    // console.log(ph)
    // console.log(ph.length)
  }, [ph])
  return (
    <>
      <section className="bg-emerald-500 flex items-center justify-center h-screen">
        {user?
<h2 className="text-center leading-normal text-white font-medium text-3xl mb-6">
  Login Success
</h2>
:
        <div className="w-80 flex flex-col gap-4 rounded-lg p-4">
          <h1 className="text-center leading-normal text-white font-medium text-3xl mb-4">
            Welcome to <br /> MY OTP VERIFIER
          </h1>
          <Toaster toastOptions={{duration:4000}}/>
          {
          !showOpt
          ?
          <>
            <div className="bg-white text-emeral-500 w-fit mx-auto p-2 rounded-full ">
              <h1>
                <FaPhoneAlt size={30} />
              </h1>
            </div>
            <label
              htmlFor="ph"
              className="font-bold text-2xl text-white text-center"
            >
              Enter your Number
            </label>
            <PhoneInput country={"in"} value={ph} onChange={setph} className="w-full"/>
            <button className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded hover:bg-emerald-800 "  onClick={onSignup}>
              {loading && (
                <CgSpinnerAlt size={20} className="mx-2 animate-spin" />
              )}
              <span disabled className="disabled:bg-emarald">Send</span>
              
            </button>
          <div id="recaptcha-container"></div>
          </>
          :
          <>
            <div className="bg-white text-emeral-500 w-fit mx-auto p-2 rounded-full ">
              <h1>
                <i class="fa-solid fa-shield-halved "></i>
              </h1>
            </div>
            <label
              htmlFor="ph"
              className="font-bold text-2xl text-white text-center"
            >
              Enter your OTP
            </label>
            <OtpInput
              className="otp-container"
              OTPLength={6}
              otpType={"number"}
              value={otp}
              onChange={setOtp}
              autoFocus
            />
            <button className="bg-emerald-600 w-full flex gap-1 items-center justify-center py-2.5 text-white rounded hover:bg-emerald-800" onClick={OTPverify}>
              {loading && (
                <CgSpinnerAlt size={20} className="mx-2 animate-spin" />
              )}
              <span>Verify</span>
            </button>
          </>
          }
        </div>
        }
      </section>
    </>
  );
}

export default App;
