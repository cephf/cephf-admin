interface AuthButtonProps {
    text:string,
    
}
const AuthButton = ({text}:AuthButtonProps) => {
  return <button  className="py-3 w-full text-[#FFFFFF] bg-[#186D0F] rounded-[16px]">{text}</button>
}

export default AuthButton