import { useEffect, useState } from "react";
import { HeaderPage } from "../../../components/Header/header";
import apiLogin from "../../../services/login";
import type { IPayload } from "../../../components/types";

export default function homeSecurePage() {
  const [error, setError] = useState("");
  const [user, setUser] = useState<IPayload>();

  const id = apiLogin.getId()

  useEffect(() => {
    if (!id) {
      setError("Nenhum usuario encontrado");
      return;
    }

    async function getUser() {
      try {
        const response = await apiLogin.getAccount(id!);
        setUser(response as IPayload);
      } catch (error) {
        setError("Erro ao buscar usuario");
      }
    }
    getUser();
  }, [id]);

  return (
    <div className="flex flex-col h-screen">
      <HeaderPage />
      <div className="bg-[#161B28] flex-1 flex justify-center items-center ">
        <div className="bg-[#313B55] w-100 h-100 flex flex-col justify-center items-center rounded-4xl shadow-2xl/100 px-5">
            {error && <p className="text-red-500 mb-10 text-[20px]">{error}</p>}
          <h1 className="text-[#ffff] mb-10 font-semibold text-3xl font-mono underline underline-offset-2">
            Página de inicio
          </h1>
          {user ? (
            <p className="text-[#ffff] font-mono text-[18px]">
              Seja bem vindo {`${user.username}`} 👋
            </p>
          ) : (
            <p className="text-[#ffff] font-mono text-[18px]">
              Carregando usuario...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
