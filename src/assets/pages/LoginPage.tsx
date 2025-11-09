import { useState } from "react";
import AuthButton from "../components/buttons/AuthButton";
import InputComponent from "../components/inputs/InputComponent";
import AuthLayout from "../layouts/AuthLayout";
import NavbarLayout from "../layouts/features/NavbarLayout";
import { useNavigate } from "react-router-dom";
import {
  loginOrRegisterWithGoogle,
  loginWithEmail,
} from "../services/auth/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submit(e: any) {
    e.preventDefault();
    try {
      const userCredential = await loginWithEmail(email, password);
      console.log("Login berhasil:", userCredential);
      alert("Login sukses!");
      navigate("/");
      return userCredential;
    } catch (error: any) {
      console.error("Error saat login:", error.message);
      alert(error.message);
    }
  }
  async function submitWithGoogle() {
    try {
      const userCredential = await loginOrRegisterWithGoogle();
      navigate("/");

      //save token
      const token = await userCredential.getIdToken();
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("login or register error :", error);
    }
  }

  return (
    <>
      <NavbarLayout />
      <AuthLayout>
        <div className="gap-2.5 w-full">
          <h1 className="text-center">Masuk ke Akun</h1>
          <p className="text-center gray">
            Yuk, lanjutin belajarmu di videobelajar.
          </p>
        </div>
        <form className="gap-5 md:gap-6 w-full" onSubmit={(e) => submit(e)}>
          <div className="w-full flex flex-col gap-6">
            <div className="w-full gap-3 md:gap-4">
              <p className="gray">
                E-Mail <span className="text-red-500">*</span>
              </p>
              <InputComponent id="email" value={email} setValue={setEmail} />
            </div>
            <div className="w-full gap-3 md:gap-4">
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
            <div className="flex flex-col gap-4 w-full">
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
              action={submitWithGoogle}
            />
          </div>
        </form>
      </AuthLayout>
    </>
  );
}
