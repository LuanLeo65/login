import { useState } from "react";
import type { ISetPayload, IError } from "../../../components/types";
import apiLogin from "../../../services/login";
import { useNavigate } from "react-router-dom";
import { HeaderPage } from "../../../components/Header/header";

export default function setLogin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<IError>({});

  const navigate = useNavigate();

  async function handleSetAccount(e: any) {
    e.preventDefault();

    const userId = await apiLogin.getId()
    if (!userId) {
      return setError("Faça login novamente");
    }

    const setPayload: ISetPayload = {};

    if (name.trim()) setPayload.username = name;
    if (email.trim()) setPayload.email = email;
    if (password.trim()) setPayload.password = password;

    if (Object.keys(setPayload).length === 0) {
      setError("Preencha pelo menos um campo para alterar");
      return;
    }

    try {
      await apiLogin.setAccount(userId, setPayload);

      navigate("/info");
    } catch (error: any) {
      if (error.response) {
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
    <div className="flex flex-col h-screen">
      <HeaderPage />
      <form
        onSubmit={handleSetAccount}
        className="flex-1 bg-[#161B28] flex justify-center items-center"
      >
        <div className="bg-[#313B55] w-100 h-auto py-10 flex flex-col justify-center items-center rounded-4xl shadow-2xl/100 ">
          <h1 className="text-[#ffff] text-[30px] font-semibold font-mono mb-10 underline underline-offset-2">
            Alterar
          </h1>
          {error && <p className="text-red-500 mb-5">{error}</p>}
          <div className="flex flex-col justify-center items-center ">
            <div>
              <label className="text-[#ffff] text-[18px] font-semibold font-mono">
                Nome:
              </label>
              <input
                type="text"
                placeholder="Digite seu novo nome"
                onChange={(e) => setName(e.target.value)}
                className="text-[#ffff] border-b-1 outline-none"
              />
            </div>
            {fieldErrors.username && (
              <p className="text-red-400">{fieldErrors.username} </p>
            )}
          </div>
          <div className="flex flex-col justify-center items-center my-5">
            <div>
              <label className="text-[#ffff] text-[18px] font-semibold font-mono">
                E-mail:
              </label>
              <input
                type="email"
                placeholder="Digite seu novo e-mail"
                onChange={(e) => setEmail(e.target.value)}
                className="text-[#ffff] border-b-1 outline-none"
              />
            </div>
            {fieldErrors.email && (
              <p className="text-red-400">{fieldErrors.email} </p>
            )}
          </div>
          <div className="flex flex-col justify-center mb-10">
            <div>
              <label className="text-[#ffff] text-[18px] font-semibold font-mono">
                Senha:
              </label>
              <input
                type="password"
                placeholder="Digite sua nova senha"
                onChange={(e) => setPassword(e.target.value)}
                className="text-[#ffff] border-b-1 outline-none"
              />
            </div>
            {fieldErrors.password && (
              <p className="text-red-400">{fieldErrors.password} </p>
            )}
          </div>
          <button
            type="submit"
            className="cursor-pointer bg-[#006AFF] text-[#ffff] px-3 py-1 mb-5 rounded-3xl hover:scale-110 transition ease-in-out duration-300 hover:font-semibold font-mono text-[16px] hover:bg-[#004EBB]"
          >
            Alterar
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
