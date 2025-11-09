import hidePassword from "../../images/icons/hide-password.png";
import showPassword from "../../images/icons/view-password.png";

interface TInputAccountComponent {
  type: string;
  label: string;
  value: string;
  setValue: (newValue: string) => void;
  id: string;
  disabled?: boolean;
}

export default function InputAccoutComponent({
  type,
  label,
  value,
  setValue,
  id,
  disabled = false,
}: TInputAccountComponent) {
  let isShow: boolean = false;
  function togglePassword() {
    const inputElement: any = document.getElementById(id);
    const iconPassword: any = document.getElementById(`${id}icon`);
    if (isShow) {
      inputElement.type = "password";
      iconPassword.src = hidePassword;
      isShow = false;
    } else {
      inputElement.type = "text";
      iconPassword.src = showPassword;
      isShow = true;
    }
  }
  return (
    <div className="w-full h-[49px] relative">
      <input
        disabled={disabled}
        required
        id={id}
        onChange={(e) => setValue(e.target.value)}
        value={value}
        type={type}
        className={`peer w-full h-full border border-[#3A35411F] px-3 rounded-[10px] focus:border-[#3ECF4C] focus:outline-none ${
          type === "password" && "pr-12"
        } ${disabled && "bg-gray-300"}`}
      />
      <p
        className={`absolute -top-3 left-2 ${
          disabled ? "" : "bg-white"
        } text-[#333333AD] peer-focus:text-[#3ECF4C] transition-colors duration-200`}
      >
        {label}
      </p>
      {type === "password" && (
        <img
          id={`${id}icon`}
          src={hidePassword}
          alt=""
          className="absolute w-6 right-5 top-[25%] opacity-50"
          onClick={togglePassword}
        />
      )}
    </div>
  );
}
