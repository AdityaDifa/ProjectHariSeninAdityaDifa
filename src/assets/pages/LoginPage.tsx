import { useState } from "react";
import AuthButton from "../components/buttons/AuthButton";
import InputComponent from "../components/inputs/InputComponent";
import AuthLayout from "../layouts/AuthLayout";
import NavbarLayout from "../layouts/features/NavbarLayout";
import AuthLogin from "../services/AuthLogin";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function submit(e: any) {
    e.preventDefault();
    const checkAccount: boolean = AuthLogin({ email, password });
    if (checkAccount) {
      localStorage.setItem("isLogin", "true");
      navigate("/");
    } else {
      localStorage.setItem("isLogin", "false");
      alert("email atau password salah");
    }
  }
  return (
    <>
      <NavbarLayout />
      <AuthLayout>
        <div className="gap-[10px] w-full">
          <h1 className="text-center">Masuk ke Akun</h1>
          <p className="text-center gray">
            Yuk, lanjutin belajarmu di videobelajar.
          </p>
        </div>
        <form
          className="gap-[20px] md:gap-[24px] w-full"
          onSubmit={(e) => submit(e)}
        >
          <div className="w-full flex flex-col gap-[24px]">
            <div className="w-full gap-[12px] md:gap-[16px]">
              <p className="gray">
                E-Mail <span className="text-red-500">*</span>
              </p>
              <InputComponent id="email" value={email} setValue={setEmail} />
            </div>
            <div className="w-full gap-[12px] md:gap-[16px]">
              <p className="gray">
                Kata Sandi <span className="text-red-500">*</span>
              </p>
              <InputComponent
                id="password"
                isPassword={true}
                value={password}
                setValue={setPassword}
              />
            </div>
            <a href="">
              <p className="text-[#333333AD] text-end">Lupa Password?</p>
            </a>
            <div className="flex flex-col gap-[16px] w-full">
              <AuthButton label="Masuk" theme="primary" type="submit" />
              <AuthButton
                label="Daftar"
                theme="secondary"
                type="button"
                action={() => navigate("/register")}
              />
            </div>
            <div className="flex flex-row items-center">
              <div className="border-t border-[#F1F1F1] flex w-full"></div>
              <p className="mx-2 gray">Atau</p>
              <div className="border-t border-[#F1F1F1] flex w-full"></div>
            </div>
            <AuthButton
              label="Masuk dengan Google"
              type="button"
              theme="google"
            />
          </div>
        </form>
      </AuthLayout>
    </>
  );
}
