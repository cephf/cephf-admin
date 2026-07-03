import AuthButton from "../../components/shared/inputs/AuthButton";
import AuthLayout from "../../components/layouts/AuthLayout";
import PasswordInput from "../../components/shared/inputs/PasswordInput";
import { useState } from "react";

const ResetPassword = () => {
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(formData: FormData) {
    const data = Object.fromEntries(formData);

    if (data.password !== data.newpassword) {
      setErrorMessage("Password and confirm password must match");
    }
  }
  return (
    <div className="">
      <AuthLayout title="Rest your password">
        <form action={handleSubmit} className="mt-13">
          <div className="flex flex-col gap-6">
            <PasswordInput
              label={"Password"}
              value={""}
              name={"password"}
              placeholder={"Enter password"}
            />
            <PasswordInput
              label={"Re-type new password"}
              value={""}
              name={"newpassword"}
              placeholder={"Enter password"}
            />
          </div>
          <p className="mt-2 text-[red] text-sm font-normal">{errorMessage}</p>
          <div className="mt-13.5">
            <AuthButton text={"Log in"} />
          </div>
        </form>
      </AuthLayout>
    </div>
  );
};

export default ResetPassword;
