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
import InputAccoutComponent from "../components/inputs/InputAccountComponent";
import InputTelpFlagComponent from "../components/inputs/InputTelpFlagComponent";
import InputGenderComponent from "../components/inputs/InputGenderComponent";
import AuthButton from "../components/buttons/AuthButton";
import { updateAccountProfile } from "../services/auth/auth";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

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
  phoneNumber?: string;
  gender?: string;
};

export default function ProfilePage() {
  const [menu, setMenu] = useState("profile");
  const [userData, setUserData] = useState<UserData | null>(null);

  const [flag, setFlag] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");

  const { imageUrl, isGoogleAccount } = useAuthStore();

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {
            const data = userSnap.data();
            setUserData(userSnap.data());

            //set data in state
            setFlag(data?.phoneNumber?.slice(0, 3) ?? "");
            setPhoneNumber(data?.phoneNumber?.slice(3) ?? "");
            setFullName(data?.fullName);
            setEmail(data?.email);
            setGender(data?.gender);
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
    });

    return () => unsubscribe();
  }, []);

  async function submitEditProfile(e: any) {
    e.preventDefault();

    if (password.length < 6 && confirmPassword.length < 6) {
      return alert("password must be more than 6");
    }
    if (password !== confirmPassword) {
      alert("password doesnt match");
    } else {
      if (isGoogleAccount) {
        //if using google account
        await updateAccountProfile(fullName);
      } else {
        //if using native email
        await updateAccountProfile(
          fullName,
          gender,
          flag + phoneNumber,
          email,
          password,
          oldPassword
        );
      }
    }

    navigate(0);
  }

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
          <div className="w-full border-[#3A35411F] border bg-white p-6 rounded-[10px] gap-6">
            <div className="flex gap-3.5 items-center">
              <img
                src={
                  isGoogleAccount
                    ? imageUrl
                    : "https://avatar.iran.liara.run/public"
                }
                className="w-10 h-10 md:w-[92px] md:h-[92px] flex-nowrap"
              />
              <div>
                <h5 className="font-bold text-[16px] md:text-[20px]">
                  {userData?.fullName}
                </h5>
                <p className="text-[#222325] text-[16px] md:text-[18px]">
                  {userData?.email}
                </p>
                <a
                  href=""
                  className="text-[#F64920] font-bold text-[14px] md:text-[16px]"
                >
                  Ganti Foto Profil
                </a>
              </div>
            </div>
            <div className="border-t border-[#F1F1F1] flex w-full my-2"></div>
            <form
              className="grid md:grid-cols-3 py-3 gap-4"
              onSubmit={submitEditProfile}
            >
              <InputAccoutComponent
                id="fullName"
                type="string"
                label={"Nama Lengkap"}
                value={fullName ?? ""}
                setValue={setFullName}
              />
              {!isGoogleAccount && (
                <>
                  {" "}
                  <InputAccoutComponent
                    id="email"
                    type="string"
                    label={"E-Mail"}
                    value={email ?? ""}
                    setValue={setEmail}
                    disabled={true}
                  />
                  <div className="flex">
                    <div className="basis-1/3 border border-[#3A35411F] rounded-[10px] focus:border-[#3ECF4C] focus:outline-none">
                      <InputTelpFlagComponent
                        id="phoneFlag"
                        value={flag}
                        setValue={setFlag}
                      />
                    </div>
                    <div className="basis-2/3">
                      <InputAccoutComponent
                        id="phoneNumber"
                        type="string"
                        label={"No. Hp"}
                        value={phoneNumber}
                        setValue={setPhoneNumber}
                      />
                    </div>
                  </div>
                  <InputGenderComponent
                    id="gender"
                    value={gender}
                    setValue={setGender}
                  />
                  <InputAccoutComponent
                    type="password"
                    label="Password Lama"
                    id="oldPassword"
                    value={oldPassword}
                    setValue={setOldPassword}
                  />
                  <InputAccoutComponent
                    type="password"
                    label="Password"
                    id="password"
                    value={password}
                    setValue={setPassword}
                  />
                  <InputAccoutComponent
                    type="password"
                    label="Konfirmasi Password"
                    id="confirmPassword"
                    value={confirmPassword}
                    setValue={setConfirmPassword}
                  />
                </>
              )}
              <AuthButton label="Simpan" theme="primary" type="submit" />
            </form>
          </div>
        </div>
      </DashboardLayout>
      <FooterLayout />
    </>
  );
}
