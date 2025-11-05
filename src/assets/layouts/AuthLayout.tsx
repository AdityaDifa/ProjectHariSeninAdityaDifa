export default function AuthLayout({ children }: any) {
  return (
    <section className="h-min-screen w-full flex flex-col items-center bg-[#fffdf3] px-[20px] py-[28px] md:px-[120px] md:py-[64px]">
      <div className="bg-white  w-full md:w-[590px] h-fit rounded-[4px] border border-[#F1F1F1] p-[20px] md:p-[36px] flex flex-col gap-[20px] md:gap-[36px]">
        {children}
      </div>
    </section>
  );
}
