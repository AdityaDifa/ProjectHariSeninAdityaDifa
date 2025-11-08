import { CgProfile } from "react-icons/cg";
import DashboardLayout from "../layouts/DashboardLayout";
import FooterLayout from "../layouts/features/FooterLayout";
import NavbarLayout from "../layouts/features/NavbarLayout";
import type { IconType } from "react-icons";
import { MdOutlineLibraryBooks } from "react-icons/md";
import { CiShoppingBasket } from "react-icons/ci";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase/firebase";

type TButtonMenu = {
  id: string;
  label: string;
  icon: IconType; // tipe dari React Icons
};

const buttonStyle = {
  active: {
    text: "text-[#FFBD3A]",
    icon: "fill-[#FFBD3A]",
    button: "bg-[#FFF7D7CC] border border-[#FFBD3A]",
  },
  notActive: {
    text: "text-[#3A354161]",
    icon: "fill-[#3A354161]",
    button: "",
  },
};

type UserData = {
  fullName?: string;
  email?: string;
};

export default function ProfilePage() {
  const [menu, setMenu] = useState("profile");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            setUserData(userSnap.data());
          } else {
            console.warn("data not found");
            setUserData(null);
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  function ButtonMenu({ id, label, icon: Icon }: TButtonMenu) {
    function buttonClick() {
      setMenu(id);
    }
    return (
      <button
        className={`flex items-center gap-3 p-3 rounded w-full ${
          menu === id ? buttonStyle.active.button : buttonStyle.notActive.button
        }`}
        id={id}
        onClick={buttonClick}
      >
        <Icon
          className={`${
            menu === id ? buttonStyle.active.icon : buttonStyle.notActive.icon
          }`}
        />
        <p
          className={`font-bold ${
            menu === id ? buttonStyle.active.text : buttonStyle.notActive.text
          }`}
        >
          {" "}
          {label}
        </p>
      </button>
    );
  }
  return (
    <>
      <NavbarLayout />
      <DashboardLayout>
        <div className="w-full flex flex-col md:flex-row gap-6 px-7 py-5">
          <div className="w-full md:w-[292px] gap-6">
            <h5 className="font-semibold text-[20px]">Ubah Profile</h5>
            <p className="text-[16px] gray">Ubah data diri Anda</p>
            <div className="bg-white border border-[#3A35411F] roudend-[10px] p-6 w-full gap-2 flex flex-col">
              <ButtonMenu id="profile" label="Profil Saya" icon={CgProfile} />
              <ButtonMenu
                id="classes"
                label="Kelas Saya"
                icon={MdOutlineLibraryBooks}
              />
              <ButtonMenu
                id="history"
                label="Pesanan Saya"
                icon={CiShoppingBasket}
              />
            </div>
          </div>
          <div className="w-full border-[#3A35411F] border bg-white">
            <div className="flex gap-3.5">
              <img
                src="https://avatar.iran.liara.run/public"
                className="w-10 md:w-[92px]"
              />
              <div>
                <h5 className="font-bold text-[16px] md:text-[20px]">
                  {loading ? "loading" : userData?.fullName}
                </h5>
                <p className="text-[#222325] text-[16px] md:text-[18px]">
                  {loading ? "loading" : userData?.email}
                </p>
                <a
                  href=""
                  className="text-[#F64920] font-bold text-[14px] md:text-[16px]"
                >
                  Ganti Foto Profil
                </a>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
      <FooterLayout />
    </>
  );
}
