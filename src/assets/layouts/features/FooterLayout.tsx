import { useEffect, useState } from "react";
import logoIcon from "../../images/Logo.png";
import facebookIcon from "../../images/icons/social media/facebook.png";
import instagramIcon from "../../images/icons/social media/instagram.png";
import linkedinIcon from "../../images/icons/social media/linkedin.png";
import twitterIcon from "../../images/icons/social media/twitter.png";

export default function FooterLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function Information() {
    return isMobile ? (
      <div>
        <details>
          <summary className="font-semibold">Kategori</summary>
          <div className="flex flex-col gap-2">
            <a href="#" className="gray">
              Digital & Teknologi
            </a>
            <a href="#" className="gray">
              Pemasaran
            </a>
            <a href="#" className="gray">
              Manajemen Bisnis
            </a>
            <a href="#" className="gray">
              Pengembangan Diri
            </a>
            <a href="#" className="gray">
              Desain
            </a>
          </div>
        </details>
        <details>
          <summary className="font-semibold">Perusahaan</summary>
          <div className="flex flex-col gap-2">
            <a href="#" className="gray">
              Tentang Kami
            </a>
            <a href="#" className="gray">
              FAQ
            </a>
            <a href="#" className="gray">
              Kebijakan Privasi
            </a>
            <a href="#" className="gray">
              Ketentuan Layanan
            </a>
            <a href="#" className="gray">
              Bantuan
            </a>
          </div>
        </details>
        <details>
          <summary className="font-semibold">Komunitas</summary>
          <div className="flex flex-col gap-2">
            <a href="#" className="gray">
              Tips Sukses
            </a>
            <a href="#" className="gray">
              Blog
            </a>
          </div>
        </details>
      </div>
    ) : (
      <div className="flex gap-12 justify-center">
        <div className="flex flex-col gap-2">
          <h5 className="font-semibold">Kategori</h5>
          <a href="#" className="gray">
            Digital & Teknologi
          </a>
          <a href="#" className="gray">
            Pemasaran
          </a>
          <a href="#" className="gray">
            Manajemen Bisnis
          </a>
          <a href="#" className="gray">
            Pengembangan Diri
          </a>
          <a href="#" className="gray">
            Desain
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="font-semibold">Perusahaan</h5>
          <a href="#" className="gray">
            Tentang Kami
          </a>
          <a href="#" className="gray">
            FAQ
          </a>
          <a href="#" className="gray">
            Kebijakan Privasi
          </a>
          <a href="#" className="gray">
            Ketentuan Layanan
          </a>
          <a href="#" className="gray">
            Bantuan
          </a>
        </div>
        <div className="flex flex-col gap-2">
          <h5 className="font-semibold">Komunitas</h5>
          <a href="#" className="gray">
            Tips Sukses
          </a>
          <a href="#" className="gray">
            Blog
          </a>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full h-fit bg-white p-5 md:px-[120px] md:py-[60px] md:gap-5">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col gap-2 md:w-[30%]">
          <img
            src={logoIcon}
            className="w-[150px] md:w-[200px] relative right-4"
          />
          <h5 className="text-[14px] md:text-[16px] font-bold">
            Gali Potensi Anda Melalui Pembelajaran Video di hariesok.id!
          </h5>
          <p>Jl. Usman Effendi No. 50 Lowokwaru, Malang</p>
          <p>+62-877-7123-1234</p>
        </div>
        <Information />
      </div>
      <div className="flex mt-4 flex-col gap-2 md:flex-row-reverse md:justify-between">
        <div className="flex gap-3">
          <img src={linkedinIcon} className="w-[35px]" />
          <img src={facebookIcon} className="w-[35px]" />
          <img src={instagramIcon} className="w-[35px]" />
          <img src={twitterIcon} className="w-[35px]" />
        </div>
        <p className="gray">@2023 Gerobak Sayur All Rights Reserved.</p>
      </div>
    </div>
  );
}
