import { useState } from "react";
import InputComponent from "../components/inputs/InputComponent";
import AuthLayout from "../layouts/AuthLayout";
import NavbarLayout from "../layouts/features/NavbarLayout";
import InputGenderComponent from "../components/inputs/InputGenderComponent";
import InputTelpFlagComponent from "../components/inputs/InputTelpFlagComponent";
import AuthButton from "../components/buttons/AuthButton";
import { useNavigate } from "react-router-dom";
import AuthRegister from "../services/AuthRegister";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [fullName, setFullName] = useState("");
  const [shortPhone, setShortPhone] = useState("");
  const [phoneFlag, setPhoneFlag] = useState("+1");
  const [gender, setGender] = useState("male");

  const navigate = useNavigate();

  function checkPassword() {
    return password === passwordConfirm ? true : false;
  }

  function submitRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (checkPassword()) {
      const phone: string = phoneFlag + shortPhone;
      const isRegistered = AuthRegister({
        email,
        password,
        fullName,
        phone,
        gender,
      });
      if (isRegistered) navigate("/login");
    } else {
      alert("Password and confirm password not match");
    }
  }

  return (
    <>
      <NavbarLayout />;
      <AuthLayout>
        <div className="flex flex-col items-center gap-2.5">
          <h1>Pendaftaraan Akun</h1>
          <p className="gray">Yuk, daftarkan akunmu sekarang juga</p>
        </div>
        <div className="flex flex-col w-full rouded-[4px] gap-5">
          <form className="flex flex-col gap-5" onSubmit={submitRegister}>
            <div>
              <p className="gray">
                Nama Lengkap <span className="text-red-500">*</span>
              </p>
              <InputComponent
                id="fullname"
                setValue={setFullName}
                value={fullName}
              />
            </div>
            <div>
              <p className="gray">
                E-Mail <span className="text-red-500">*</span>
              </p>
              <InputComponent id="email" setValue={setEmail} value={email} />
            </div>
            <div>
              <p className="gray">
                Jenis Kelamin <span className="text-red-500">*</span>
              </p>
              <InputGenderComponent
                id="gender"
                value={gender}
                setValue={setGender}
              />
            </div>
            <div>
              <p className="gray">
                No. Hp <span className="text-red-500">*</span>
              </p>
              <div className="flex gap-2 items-center">
                <div className="md:basis-1/4 basis-1/3 border border-[#3A35411F] md:h-[34px] h-[31px] rounded-md">
                  <InputTelpFlagComponent
                    id="telpFlag"
                    value={phoneFlag}
                    setValue={setPhoneFlag}
                  />
                </div>
                <div className="md:basis-3/4 basis-2/3">
                  <InputComponent
                    id="phone"
                    value={shortPhone}
                    setValue={setShortPhone}
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="gray">
                Kata Sandi <span className="text-red-500">*</span>
              </p>
              <InputComponent
                id="password"
                value={password}
                setValue={setPassword}
                isPassword={true}
              />
            </div>
            <div>
              <p className="gray">
                Konfirmasi Kata Sandi <span className="text-red-500">*</span>
              </p>
              <InputComponent
                id="passwordConfirm"
                value={passwordConfirm}
                setValue={setPasswordConfirm}
                isPassword={true}
              />
            </div>
            <a href="">
              <p className="text-end gray">Lupa Password</p>
            </a>
            <AuthButton label="Daftar" theme="primary" type="submit" />
            <AuthButton
              label="Masuk"
              theme="secondary"
              type="button"
              action={() => navigate("/login")}
            />
          </form>
          <div className="flex flex-row items-center">
            <div className="border-t border-[#F1F1F1] flex w-full"></div>
            <p className="mx-2">Atau</p>
            <div className="border-t border-[#F1F1F1] flex w-full"></div>
          </div>
          <AuthButton
            label="Daftar dengan Google"
            theme="google"
            type="button"
          />
        </div>
      </AuthLayout>
    </>
  );
}
