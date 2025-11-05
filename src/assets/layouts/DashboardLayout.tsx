export default function DashboardLayout({ children }: any) {
  return (
    <main className="w-full px-5 py-7 md:px-[120px] md:py-16 flex flex-col gap-6 md:gap[64px] bg-[#fffdf3]">
      {children}
    </main>
  );
}
