interface TInputAccountComponent {
  type: string;
  label: string;
  value: string;
  setValue: (newValue: string) => void;
}

export default function InputAccoutComponent({
  type,
  label,
  value,
  setValue,
}: TInputAccountComponent) {
  return (
    <div className="w-full h-[49px] relative">
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        type={type}
        className="peer w-full h-full border border-[#3A35411F] px-3 rounded-[10px] focus:border-[#3ECF4C] focus:outline-none"
      />
      <p className="absolute -top-3 left-2 bg-white text-[#333333AD] peer-focus:text-[#3ECF4C] transition-colors duration-200">
        {label}
      </p>
    </div>
  );
}
