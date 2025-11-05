import googleIcon from "../../images/icons/google.png";
type TAuthButton = {
  theme: "primary" | "secondary" | "google" | "white";
  label: string;
  type: "submit" | "reset" | "button" | undefined;
  action?: () => void;
};
const style: string[] = [
  "bg-[#3ECF4C] text-white",
  "bg-[#E2FCD9CC] text-[#3ECF4C]",
  "bg-white text-[#4A505C] border border-[#F1F1F1]",
  "bg-white text-[#3ECF4C] border border-[#3ECF4C]",
];
export default function AuthButton({
  theme,
  label,
  type,
  action,
}: TAuthButton) {
  return (
    <button
      onClick={() => action?.()}
      type={type}
      className={`w-full rounded-[10px] text-[14px] md:text-[16px] font-bold font-DMSans h-[34px] md:h-[42px] ${
        theme === "primary"
          ? style[0]
          : theme === "secondary"
          ? style[1]
          : theme === "google"
          ? style[2]
          : style[3]
      }`}
    >
      <div className="flex justify-center items-center">
        {theme === "google" && (
          <img src={googleIcon} className="w-[15px] mr-1" />
        )}
        {label}
      </div>
    </button>
  );
}
