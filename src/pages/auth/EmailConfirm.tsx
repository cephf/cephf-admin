// import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link } from "react-router-dom";

const EmailConfirm = () => {
  //   const [loginData, setLoginData] = useState([]);

  return (
    <div className="">
      <AuthLayout title="Email has been sent">
        <div className="p-4 mt-8 rounded-[16px] bg-[#FAFAFA]">
          <p className="font-normal text-sm text-[#0D0D0D99]">
            Thanks! If <span className="text-[#0D0D0D]">name@email.com</span>{" "}
            matches an email we have on file, then we've sent you an email
            containing further instructions for resetting your password. <br />
            <br /> If you haven't received an email in 5 minutes, check your
            spam or 
            <span
              onClick={() => console.log("resent")}
              className="text-[#186D0F] ml-1 cursor-pointer"
            >
               resend.
            </span>
            
          </p>
        </div>
<div className=" mt-10">
<Link to={"/auth/login"} className="flex items-center gap-1 justify-center font-normal text-sm text-[#186D0F]"><ArrowLeft size={14}/>Return to login</Link>

</div>
      </AuthLayout>
    </div>
  );
};

export default EmailConfirm;
