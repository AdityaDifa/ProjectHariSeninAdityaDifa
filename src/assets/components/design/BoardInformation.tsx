export default function BoardInformation({
  children,
  sourceImage,
}: {
  children: React.ReactNode;
  sourceImage: string;
}) {
  return (
    <div className="w-full h-fit relative px-5 md:px-20 py-10 md:py-16 flex flex-col justify-center gap-6 bg-black rounded-[10px]">
      <div
        style={{
          backgroundImage: `url(${sourceImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="absolute inset-0 opacity-25"
      ></div>
      <div className="relative z-10 flex flex-col items-center gap-4">
        {children}
      </div>
    </div>
  );
}
