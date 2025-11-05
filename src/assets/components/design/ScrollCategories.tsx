type TScrollCategories = {
  category: string;
  setCategories: React.Dispatch<React.SetStateAction<string>>;
};
export default function ScrollCategories({
  category,
  setCategories,
}: TScrollCategories) {
  const categories: string[] = [
    "Semua Kelas",
    "Pemasaran",
    "Desain",
    "Pengembangan Diri",
    "Bisnis",
  ];
  const style: string[] = ["text-[#F64920]", "text-[#333333AD]"];

  function ButtonCategory({ label }: { label: string }) {
    return (
      <button
        className={`text-base md:text-4 font-semibold w-fit py-3 pr-9 whitespace-nowrap cursor-pointer ${
          category === label ? style[0] : style[1]
        }`}
        onClick={() => setCategories(label)}
      >
        {label}
      </button>
    );
  }
  return (
    <div className="flex overflow-x-auto">
      {categories.map((category) => (
        <ButtonCategory label={category} key={category} />
      ))}
    </div>
  );
}
