import bg_login from "@/assets/bg-login.webp";
import auth from "@/assets/auth.png";
import { ChevronLeft, Eye, EyeOff, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiLoginSuccess, apiRegister } from "@/services/authService";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccessAction } from "@/stores/actions/authAction";
import cskh from "@/assets/cskh.png"
import { useTranslation } from "react-i18next";
import TinyFlag from "tiny-flag-react";
const Auth = () => {
  const {
    register,
    handleSubmit,
    resetField,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      code : ""
    },
  });
  const [t, i18n] = useTranslation("global");
  const { isLoggedIn, token } = useSelector((state) => state.auth);
  const [registerPage, setRegisterPage] = useState(true);
  const [hiddenPassword, setHiddenPassword] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLanguageDropdownOpen, setLanguageDropdownOpen] = useState(false);

  const handleChangeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
    setLanguageDropdownOpen(false); 
  };
  
  const onSubmit = async (values) => {
    if (!registerPage) {
      try {
        const data = await apiRegister(values);
        if (data.success) {
          toast.success("Tạo tài khoản thành công");
          setRegisterPage(!registerPage);
          resetForm();
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    } else {
      const data = await apiLoginSuccess(values);
      if (data.success === 0) {
        dispatch(loginSuccessAction(values));
        resetForm();
        setTimeout(() => {
          navigate("/");
          localStorage.setItem("page", 4);
        }, 1000);
        // setTimeout(() => {
        //   toast.success(`Đăng nhập thành công`);
        // }, 2000);
        // if (data?.accessToken) {
        //   navigate("/admin/collection");
        // } else {
        //   navigate("/");
        // }
      } else {
        toast.error(data.success);
      }
    }
  };
  const handleClick = () => resetField("username");
  const resetForm = () => {
    resetField("password");
    resetField("username");
    resetField("code");

  };
  useEffect(() => {
    if (isLoggedIn && token) navigate("/");
  }, [isLoggedIn, token, navigate]);
  return (
    <>
      {registerPage ? (
        <div className="relative w-full mx-auto lg:w-[30%] bg-blue-500 h-screen ">
          <div className="absolute w-full h-full">
            <img
              src={bg_login}
              alt="background login"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex items-center justify-between absolute z-50 w-full">
            {/* Back Navigation Icon */}
            <ChevronLeft
              onClick={() => {
                navigate("/");
                resetForm();
              }}
              className="text-white cursor-pointer"
              size={40}
            />

            {/* Language Selector Dropdown */}
            <div className="px-2">
              <button
                onClick={() => setLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className="text-white font-semibold cursor-pointer text-sm bg-gray-700 rounded px-3 py-1 hover:bg-gray-600"
              >
                {t("languageSelector")}
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mx-2 mt-2 bg-white shadow-md rounded w-[140px] overflow-hidden">
                  <button
                    onClick={() => handleChangeLanguage("vn")}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                    <TinyFlag
                      country="VN" // ISO 3166-1 alpha-2 code
                      alt="United States Flag" // Used as the image alt tag
                      fallbackImageURL="https://cdn.jsdelivr.net/npm/react-flagkit@1.0.2/img/SVG/VN.svg" 
                    /> 
                    <span>Việt Nam</span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleChangeLanguage("en")}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer"
                  >
                     <div className="flex items-center gap-2">
                    <TinyFlag
                      country="US" // ISO 3166-1 alpha-2 code
                      alt="United States Flag" // Used as the image alt tag
                      fallbackImageURL="https://cdn.jsdelivr.net/npm/react-flagkit@1.0.2/img/SVG/US.svg" 
                    /> 
                    <span>English</span>
                    </div>
                  </button>
                  <button
                    onClick={() => handleChangeLanguage("de")}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                    <TinyFlag
                      country="DE" // ISO 3166-1 alpha-2 code
                      alt="United States Flag" // Used as the image alt tag
                      fallbackImageURL="https://cdn.jsdelivr.net/npm/react-flagkit@1.0.2/img/SVG/DE.svg" 
                    /> 
                    <span>Deutsch</span>
                    </div>
                    
                  </button>
                  <button
                    onClick={() => handleChangeLanguage("kr")}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200 cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                    <TinyFlag
                      country="KR" // ISO 3166-1 alpha-2 code
                      alt="United States Flag" // Used as the image alt tag
                      fallbackImageURL="https://cdn.jsdelivr.net/npm/react-flagkit@1.0.2/img/SVG/KR.svg" 
                    /> 
                    <span>한국어</span>
                    </div>
                     
                  </button>
                </div>
              )}
            </div>
          </div>


          <div className="bg-customColor w-full h-screen z-10 absolute">
            <div className="absolute top-12 left-[25%] w-[220px] h-[168px]">
              <img src={auth} alt="logo auth" />
            </div>
            <div className="absolute top-80 flex flex-col gap-10 items-center w-full ">
              <h3 className="text-4xl font-bold text-white max-sm:text-lg">{t("loginTitle")}

              </h3>
              <div className="w-full px-12 ">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <div className="relative">
                    <input
                      placeholder={t("form.usernamePlaceholder")}
                      className="sm:text-xl text-center w-full rounded-full border-none outline-none h-[70px] max-sm:h-[40px] placeholder:max-sm:text-sm placeholder:text-xl placeholder:text-center max-sm:text-xs"
                      {...register("username", { required: true })}
                    />
                    {watch("username").length > 0 && (
                      <X
                        onClick={handleClick}
                        className="absolute max-sm:w-4 top-6 text-gray-400 right-4 max-sm:top-2"
                      />
                    )}
                  </div>
                  {errors.username && (
                    <span className="text-red-600 text-base font-bold max-sm:text-xs">
                     {t("form.usernameError")}
                    </span>
                  )}
                  {/* include validation with required or other standard HTML validation rules */}
                  <div className="relative">
                    <input
                      type={hiddenPassword ? "password" : "text"}
                      placeholder={t("form.passwordPlaceholder")}
                      {...register("password", { required: true })}
                      className="sm:text-xl text-center w-full rounded-full border-none outline-none h-[70px] max-sm:h-[40px] placeholder:max-sm:text-sm placeholder:text-xl placeholder:text-center max-sm:text-xs"
                    />
                    {hiddenPassword ? (
                      <Eye
                        onClick={() => setHiddenPassword(!hiddenPassword)}
                        className="absolute top-5 right-4 max-sm:top-3 max-sm:w-4 text-gray-400 cursor-pointer"
                      />
                    ) : (
                      <EyeOff
                        onClick={() => setHiddenPassword(!hiddenPassword)}
                        className="absolute top-5 right-4 max-sm:top-3 max-sm:w-4 text-gray-400 cursor-pointer"
                      />
                    )}
                  </div>
                  {/* errors will return when field validation fails  */}
                  {errors.password && (
                    <span className="text-red-600 text-base font-bold max-sm:text-xs">
                     {t("form.passwordError")}
                    </span>
                  )}
                  <div className="flex items-center justify-between px-2">
                  
                  <div className="flex items-center gap-1 ">
                    <img src={cskh} alt="cskh" className="w-5 h-5 max-sm:w-4 max-sm:h-4"/>
                    <span className="cursor-pointer text-base text-white max-sm:text-[11px]">
                    {t("contact")}
                    </span>
                  </div>
                  <div >
                    <span
                      onClick={() => {
                        setRegisterPage(!registerPage);
                        resetForm();
                      }}
                      className="text-lg cursor-pointer font-semibold text-white max-sm:text-xs"
                    >
                       {t("form.signupAccount")}
                    </span>
                  </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#775fd9] sm:text-xl text-center w-full rounded-full border-none outline-none h-[50px] placeholder:text-xl text-white  font-bold placeholder:text-center max-sm:text-sm max-sm:h-[35px]"
                  >
                    {t("form.loginButton")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative w-full mx-auto  lg:w-[30%] bg-blue-500 h-screen  ">
          <div className="absolute w-full h-full">
            <img
              src={bg_login}
              alt="background login"
              className="w-full h-full object-cover"
            />
          </div>
          <ChevronLeft
            onClick={() => {
              setRegisterPage(!registerPage);
              resetForm();
            }}
            className="absolute z-30 top-0 left-4 text-white cursor-pointer"
            size={40}
          />
          <div className="bg-customColor w-full h-screen z-10 absolute">
            <div className="absolute top-12 left-[25%] w-[220px] h-[168px]">
              <img src={auth} alt="logo auth" />
            </div>
            <div className="absolute top-80 flex flex-col gap-10 items-center w-full ">
              <h3 className="text-4xl font-bold text-white max-sm:text-lg">{t("registerTitle")}</h3>
              <div className="w-full px-12 ">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <div className="relative">
                    <input
                      placeholder={t("form.usernamePlaceholder")}
                      className="sm:text-xl text-center w-full rounded-full border-none outline-none h-[70px] max-sm:h-[40px] placeholder:max-sm:text-sm placeholder:text-xl placeholder:text-center max-sm:text-xs"
                      {...register("username", { required: true })}
                    />
                    {watch("username").length > 0 && (
                      <X
                        onClick={handleClick}
                        className="absolute max-sm:w-4 top-6 text-gray-400 right-4 max-sm:top-2"
                      />
                    )}
                  </div>
                  {errors.username && (
                    <span className="text-red-600 text-base font-bold max-sm:text-xs">
                    {t("form.usernameError")}
                    </span>
                  )}
                  {/* include validation with required or other standard HTML validation rules */}
                  <div className="relative">
                    <input
                      type={hiddenPassword ? "password" : "text"}
                      placeholder={t("form.passwordPlaceholder")}
                      {...register("password", { required: true })}
                      className="sm:text-xl text-center w-full rounded-full border-none outline-none h-[70px] max-sm:h-[40px] placeholder:max-sm:text-sm placeholder:text-xl placeholder:text-center max-sm:text-xs"
                    />
                    {hiddenPassword ? (
                      <Eye
                        onClick={() => setHiddenPassword(!hiddenPassword)}
                        className="absolute top-5 right-4 max-sm:top-3 max-sm:w-4 text-gray-400 cursor-pointer"
                      />
                    ) : (
                      <EyeOff
                        onClick={() => setHiddenPassword(!hiddenPassword)}
                        className="absolute top-5 right-4 max-sm:top-3 max-sm:w-4 text-gray-400 cursor-pointer"
                      />
                    )}
                  </div>
                  {/* errors will return when field validation fails  */}
                  {errors.password && (
                    <span className="text-red-600 text-base font-bold max-sm:text-xs">
                    {t("form.passwordError")}
                    </span>
                  )}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={t("form.codePlaceholder")}
                      {...register("code", { required: t("form.codedError"), 
                        validate: (value) => 
                         {
                          return  value.length > 6 || t("form.codedLengthError")
                         }
                      })}
                      className="sm:text-xl text-center w-full rounded-full border-none outline-none h-[70px] max-sm:h-[40px] placeholder:max-sm:text-sm placeholder:text-xl placeholder:text-center max-sm:text-xs"
                    />
                   
                  </div>
                  {errors.code && (
                    <span className="text-red-600 text-base font-bold max-sm:text-xs">
                     {errors.code.message}
                    </span>
                  )}
                   <div className="w-full flex justify-end px-8" onClick={() => setRegisterPage(!registerPage)}>
                    <span className="font-semibold cursor-pointer text-lg text-white max-sm:text-xs">
                    {t("form.backToLogin")}
                    </span>
                  </div>
                  <button
                    type="submit"
                    className="bg-[#775fd9] sm:text-xl text-center w-full rounded-full border-none outline-none h-[50px] placeholder:text-xl text-white  font-bold placeholder:text-center max-sm:text-sm max-sm:h-[35px]"
                  >
                     {t("form.registerButton")}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Auth;
