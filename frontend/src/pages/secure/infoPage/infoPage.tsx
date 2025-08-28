import { useEffect, useState } from "react"
import { HeaderPage } from "../../../components/Header/header"
import type { IInfo } from "../../../components/types"
import apiLogin from "../../../services/login"
import { useNavigate } from "react-router-dom"

export default function infoPage() {
    const [account, setAccount] = useState<IInfo | null>(null)
    const [error, setError] = useState("")
    const [showConfirm, setShowConfirm] = useState(false)

    const userId = apiLogin.getId()
    const navigate = useNavigate()

    useEffect(() => {
        async function account() {
            if(!userId) {
                setError("Usuario nao encontrado")
                return
            }
            try {
                const data = await apiLogin.getAccount(userId)
                setAccount(data)
            } catch (error) {
                setError("Erro ao buscar informações da conta")
            }
        }
        account()
    }, [userId])

    if (error) return <p>{error}</p>
    if (!account) return <p>Carregando...</p>

    async function handleDelete(){
        if(!userId) {
                setError("Usuario nao encontrado")
                return
            }
        await apiLogin.deleteAccount(userId)
        await apiLogin.logout()
        navigate("/")
    }

    return(
        <div className="flex flex-col h-screen">
            <HeaderPage />
            <div className="flex-1 bg-[#161B28] flex justify-center items-center">
            <div className="bg-[#313B55] w-100 h-100 flex flex-col justify-center items-center rounded-4xl shadow-2xl/100 ">
            {error && <p className="text-red-500 mb-10 text-[20px]">{error}</p>}
            <h1 className="text-[#ffff] text-[29px] font-semibold font-mono mb-10 underline underline-offset-2">Informações da conta:</h1>
            <div className="flex items-center">
                <p className="text-[#ffff] text-[18px] font-semibold font-mono">Nome:</p>
                <p className="text-[#ffff] text-[16px] font-mono underline underline-offset-2">{account.username}</p>
            </div>
            <div className="flex items-center mb-10">
                <p className="text-[#ffff] text-[18px] font-semibold font-mono">E-mail:</p>
                <p className="text-[#ffff] text-[16px] font-mono underline underline-offset-2">{account.email}</p>
            </div>
            <button onClick={() => setShowConfirm(true)} className="cursor-pointer bg-[#006AFF] text-[#ffff] px-3 py-1 mb-5 rounded-3xl hover:scale-110 transition ease-in-out duration-300 hover:font-semibold font-mono text-[16px] hover:bg-[#004EBB] ">Deletar</button>
            <a href="/" className="text-[#ffff] hover:underline underline-offset-2">Voltar</a>
            </div>
            {showConfirm && (
          <div className="absolute inset-0 flex items-center justify-center ">
            
            <div
              className="absolute inset-0 bg-black opacity-50"
              onClick={() => setShowConfirm(false)}
            ></div>

           
            <div className="relative bg-white rounded-2xl p-6 z-10 shadow-lg text-center">
              <p className="text-black text-lg font-semibold mb-2">
                Tem certeza que deseja deletar sua conta?
              </p>
              <p className="text-black text-[13px] mb-4">Todas as suas informações serão apagadas.</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Sim
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded-lg hover:bg-gray-400 transition"
                >
                  Não
                </button>
              </div>
            </div>
          </div>
        )}
            </div>
        </div>
    )
}