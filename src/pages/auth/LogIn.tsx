import { Link } from "react-router-dom";
import AuthButton from "../../components/shared/inputs/AuthButton";
import TextInput from "../../components/shared/inputs/TextInput";
import AuthLayout from "./AuthLayout";
import PasswordInput from "../../components/shared/inputs/PasswordInput";

const LogIn = () => {

  function handleSubmit(formData: FormData) {
    const data = Object.fromEntries(formData);
    console.log(data);
  } 
  return (
    <div className="">
      <AuthLayout title="Welcome Back CEPHF">
        <form action={handleSubmit} className="mt-13">
          <div className="flex flex-col gap-6">
            <TextInput
              label={"Email"}
              value={""}
              name={"email"}
              placeholder={"cf@gmail.com"}
            />
            <PasswordInput
              label={"Password"}
              value={""}
              name={"password"}
              placeholder={"Enter password"}
            />

          </div>
          <Link to="/auth/email-confirm" className="font-normal text-sm text-[#186D0F]">Forgot password?</Link>
          <div className="mt-13.5">
            <AuthButton text={"Log in"} />
          </div>
        </form>
      </AuthLayout>
    </div>
  );
};

export default LogIn;
