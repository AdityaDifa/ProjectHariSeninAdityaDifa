import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/Logo.png";
import { useEffect, useState } from "react";
import dropdownIcon from "../../images/icons/dropdown-icon.png";
import AuthButton from "../../components/buttons/AuthButton";
import { signOut } from "firebase/auth";
import { auth } from "../../services/firebase/firebase";
import useAuthStore from "../../store/useAuthStore";

export default function NavbarLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [inAuthPage, setInAuthPage] = useState(
    pathname === "/register" || "/login" ? true : false
  );
  const [toggleMenu, setToggleMenu] = useState(false);

  const { user, imageUrl, isGoogleAccount } = useAuthStore();

  useEffect(() => {
    const checkPage = () => {
      setInAuthPage(
        pathname === "/register" || pathname === "/login" ? true : false
      );
    };
    return checkPage();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function AuthNav() {
    function MobileVIew() {
      return (
        <div className="relative">
          <img
            src={dropdownIcon}
            className="w-5"
            onClick={() => setToggleMenu(!toggleMenu)}
          />
          {toggleMenu && (
            <div className="absolute right-0 border p-2 bg-white w-25 flex flex-col gap-y-2">
              <a
                onClick={() => navigate("/")}
                className="select-none cursor-pointer"
              >
                <p>Kategori</p>
              </a>
              {user ? (
                <>
                  <p
                    onClick={() => {
                      navigate("/profile");
                    }}
                  >
                    Profile
                  </p>
                  <p
                    onClick={() => {
                      signOut(auth);
                      localStorage.removeItem("token");
                      navigate("/");
                    }}
                  >
                    Logout
                  </p>
                </>
              ) : (
                <>
                  <Link to="/Login">
                    <p>Login</p>
                  </Link>
                  <Link to="/Register">
                    <p>Register</p>
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      );
    }

    function DeskopView() {
      return (
        <div className="flex gap-4 w-[30%] items-center justify-end">
          <a
            onClick={() => navigate("/")}
            className="select-none cursor-pointer"
          >
            <h5 className="text-[#3ECF4C] font-semibold tracking-wide">
              Kategori
            </h5>
          </a>
          {user ? (
            <div className="relative">
              <img
                src={
                  isGoogleAccount
                    ? imageUrl
                    : "https://avatar.iran.liara.run/public"
                }
                alt=""
                className="w-10"
                onClick={() => setToggleMenu(!toggleMenu)}
              />
              {toggleMenu && (
                <div className="absolute right-0 border bg-white w-25 flex flex-col">
                  {user && (
                    <>
                      <div className="hover:bg-gray-100 p-2">
                        <p
                          onClick={() => {
                            navigate("/profile");
                          }}
                        >
                          Profile
                        </p>
                      </div>
                      <div className="hover:bg-gray-100 p-2">
                        <p
                          onClick={() => {
                            signOut(auth);
                            localStorage.removeItem("token");
                            navigate("/");
                          }}
                          className="cursor-pointer"
                        >
                          Logout
                        </p>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            <>
              <AuthButton
                label="Login"
                theme="primary"
                type="button"
                action={() => navigate("/Login")}
              />
              <AuthButton
                label="Register"
                theme="white"
                type="button"
                action={() => navigate("/Register")}
              />
            </>
          )}
        </div>
      );
    }
    return <>{isMobile ? <MobileVIew /> : <DeskopView />}</>;
  }

  return (
    <header className="w-full h-fit md:h-20 bg-white flex justify-between items-center border-y md:border-t-0 border-y-[#F1F1F1] px-6 py-4 md:px-[120px] md:py-3 shadow-[#3E434A4F] shadow-md md:shadow-none z-10 relative">
      <img src={logo} alt="" className="w-[152px] md:w-fit" />
      {!inAuthPage && <AuthNav />}
    </header>
  );
}
