export default function AuthLayout({ children }: any) {
  return (
    <section className="h-min-screen w-full flex flex-col items-center bg-[#fffdf3] px-5 py-7 md:px-[120px] md:py-16">
      <div className="bg-white  w-full md:w-[590px] h-fit rounded-sm border border-[#F1F1F1] p-5 md:p-9 flex flex-col gap-5 md:gap-9">
        {children}
      </div>
    </section>
  );
}
