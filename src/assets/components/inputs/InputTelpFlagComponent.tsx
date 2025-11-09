import CountryList from "country-list-with-dial-code-and-flag";
import { useEffect, useState } from "react";

type TInputTelpFlagComponent = {
  id: string;
  value: string;
  setValue: (newValue: string) => void;
};

export default function InputTelpFlagComponent({
  id,
  value,
  setValue,
}: TInputTelpFlagComponent) {
  const [flag, setFlag] = useState("https://flagcdn.com/16x12/ca.png");
  const [keyFlag, setKeyFlag] = useState("ca");

  function getAllDialCode() {
    const allDialCode: Array<any> = CountryList.getAll();
    const sortedData = allDialCode.sort(
      (a, b) => parseInt(a.dial_code) - parseInt(b.dial_code)
    );
    // sortedData.forEach((data) => console.log(data.data)); //<--just for testing
    return sortedData.map((data) => (
      <option
        key={`${data.data.name} ${data.data.dial_code}`}
        data-code={data.data.code}
      >
        {data.data.dial_code}
      </option>
    ));
  }

  useEffect(() => {
    setFlag(`https://flagcdn.com/16x12/${keyFlag}.png`);

    // console.log(flag); //just for testing
  }, [keyFlag]);

  return (
    <div className="flex border-[#3A35411F] rounded-md w-full h-full">
      <div className="basis-1/4 bg-[#F4F5FA] border-r border-r-[#3A35411F] p-0.5 flex items-center">
        <img src={flag} alt="" className="w-6" />
      </div>
      <div className="basis-3/4 w-full flex items-center">
        <select
          className="w-full text-center md:text-right"
          name="phoneId"
          id={id}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            const selectedOption: any = e.target.selectedOptions[0];
            setKeyFlag(selectedOption.getAttribute("data-code").toLowerCase());
          }}
        >
          {getAllDialCode()}
        </select>
      </div>
    </div>
  );
}
