import BoardInformation from "../components/design/BoardInformation";
import DashboardLayout from "../layouts/DashboardLayout";
import NavbarLayout from "../layouts/features/NavbarLayout";
import boardInformationImage from "../images/background-images/board-information-dashboard.jpg";
import { useNavigate } from "react-router-dom";
import { NormalButton } from "../components/buttons/NormalButton";
import { useState } from "react";
import ListClass from "../components/design/ListClass";
import ScrollCategories from "../components/design/ScrollCategories";
import board_2 from "../images/background-images/board-2.jpg";
import FooterLayout from "../layouts/features/FooterLayout";

export default function DashboardPage() {
  const [category, setCategories] = useState("Semua Kelas");
  const navigate = useNavigate();
  return (
    <>
      <NavbarLayout />
      <DashboardLayout>
        <BoardInformation sourceImage={boardInformationImage}>
          <h1 className="text-white text-center font-[700px] text-6 md:text-14 text-sm/tight">
            Revolusi Pembelajaran: Temukan Ilmu Baru melalui Platform Video
            Interaktif!
          </h1>
          <p className="text-[14px] md:text-[16px] font-extralight md:text-4 text-white text-center ">
            Temukan ilmu baru yang menarik dan mendalam melalui koleksi video
            pembelajaran berkualitas tinggi. Tidak hanya itu, Anda juga dapat
            berpartisipasi dalam latihan interaktif yang akan meningkatkan
            pemahaman Anda.
          </p>
          <NormalButton
            label="Temukan Video Course untuk Dipelajari!"
            color="green"
            action={() => navigate(0)}
          />
        </BoardInformation>
        <div className="flex flex-col gap-2.5">
          <h1 className="text-[24px] md:text-[32px] font-semibold">
            Koleksi Video Pembelajaran Unggulan
          </h1>
          <p className="gray text-[14px] md:text-[16px] ">
            Jelajahi Dunia Pengetahuan Melalui Pilihan Kami!
          </p>
        </div>
        <ScrollCategories category={category} setCategories={setCategories} />
        <ListClass category={category} />
        <BoardInformation sourceImage={board_2}>
          <div className="flex flex-col items-center justify-center gap-4 text-center md:w-[50%]">
            <h5 className="text-white">News Letter</h5>
            <h1 className="text-white">Mau Belajar Lebih Banyak?</h1>
            <p className="text-white">
              Daftarkan dirimu untuk mendapatkan informasi terbaru dan penawaran
              spesial dari program-program terbaik hariesok.id
            </p>
            <div className="w-full md:relative flex flex-col gap-3">
              <input
                type="text"
                className="bg-white rounded-[10px] h-12 w-full p-2 placeholder-gray-400 md:pr-28"
                placeholder="Masukan Emailmu"
              />
              <button className="bg-[#FFBD3A] text-white p-2 w-full rounded-[10px] text-md font-semibold md:w-fit md:absolute right-4 md:top-1">
                Subscribe
              </button>
            </div>
          </div>
        </BoardInformation>
      </DashboardLayout>
      <FooterLayout />
    </>
  );
}
