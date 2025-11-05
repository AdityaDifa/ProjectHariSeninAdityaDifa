type TInputGenderComponent = {
  id: string;
  value: string;
  setValue: (newValue: string) => void;
};

export default function InputGenderComponent({
  id,
  value,
  setValue,
}: TInputGenderComponent) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full border border-[#3A35411F] px-[10px] py-[4px] rounded-[6px]"
    >
      <option value="male">Male</option>
      <option value="female">Female</option>
    </select>
  );
}
