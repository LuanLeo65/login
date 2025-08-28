import { useState } from "react";
import apiLogin from "../../../services/login";
import { useLocation, useNavigate } from "react-router-dom";
import type { ILogin, IError } from "../../../components/types";
import { HeaderPage } from "../../../components/Header/header";

export default function SingIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<IError>({});

  const navigate = useNavigate();
  const location = useLocation();

  async function handleLogin(e: any) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Preencha os campos corretamente");
      return;
    }

    const loginPayload: ILogin = {
      email: email,
      password: password,
    };

    const from = location.state?.from.pathname || "/home";

    try {
      const response = await apiLogin.loginAccount(loginPayload);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.user.id);

      navigate(from);
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data);
        const data = error.response.data;

        if (data.error === "ValidationError" && data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        } else {
          setError(data.erro || "Erro desconhecido");
        }
      } else {
        setError("Ocorreu um erro inesperado, tente novamente.");
      }
    }
  }

  return (
    <div className="flex flex-col h-screen ">
      <HeaderPage />
      <form
        className="flex flex-1 justify-center items-center bg-[#161B28]"
        onSubmit={handleLogin}
      >
        <div className="bg-[#313B55] w-100 h-100 flex flex-col justify-center items-center rounded-4xl shadow-2xl/100 ">
          <h1 className="text-[#ffff] text-[30px] font-semibold font-mono mb-10 underline underline-offset-2">
            Login
          </h1>
          {error && <p className="text-red-500 mb-5">{error}</p>}
          <div className="flex flex-col justify-center items-center">
            <div>
              <label className="text-[#ffff] text-[18px] font-semibold font-mono">
                E-mail:
              </label>
              <input
                type="email"
                placeholder="Digite seu E-mail"
                onChange={(e) => setEmail(e.target.value)}
                className="text-[#ffff] border-b-1 outline-none"
              />
            </div>
            {fieldErrors.email && (
              <p className="text-red-500 mb-5">{fieldErrors.email} </p>
            )}
          </div>
          <div className="flex flex-col justify-center items-center my-10">
            <div>
              <label className="text-[#ffff] text-[18px] font-semibold font-mono">
                Senha:
              </label>
              <input
                type="password"
                placeholder="Digite sua senha"
                onChange={(e) => setPassword(e.target.value)}
                className="text-[#ffff] border-b-1 outline-none"
              />
            </div>
            {fieldErrors.password && (
              <p className="text-red-500 mb-5">{fieldErrors.password} </p>
            )}
          </div>
          <button
            type="submit"
            className="cursor-pointer bg-[#006AFF] text-[#ffff] hover:bg-[#004EBB] px-3 py-1 mb-5 rounded-3xl hover:scale-110 transition ease-in-out duration-300 hover:font-semibold font-mono text-[16px]"
          >
            Login
          </button>
          <a
            href="/"
            className="text-[#ffff] hover:underline underline-offset-2"
          >
            Voltar
          </a>
        </div>
      </form>
    </div>
  );
}
