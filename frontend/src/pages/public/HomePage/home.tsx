import { useNavigate } from "react-router-dom"
import { HeaderPage } from "../../../components/Header/header"


export default function homePage() {

    const navigate = useNavigate()

    return(
        <div className="flex h-screen flex-col">
            <HeaderPage/>
            <div className="bg-[#161B28] flex-1 flex justify-center items-center ">
                <div className="bg-[#313B55] w-100 h-100 flex flex-col justify-center items-center rounded-4xl shadow-2xl/100">
                    <p className="text-[#ffff] mb-10 font-semibold text-3xl font-mono">Faça o login</p>
                    <button onClick={() => navigate("/login")} className="cursor-pointer bg-[#006AFF] text-[#ffff] px-3 py-1 mb-5 rounded-3xl transition ease-in-out duration-300 hover:font-semibold font-mono text-[16px] hover:bg-[#004EBB]">Login</button>
                    <button onClick={() => navigate("/singup")} className="cursor-pointer bg-[#006AFF] text-[#ffff] px-3 py-1 rounded-3xl  transition ease-in-out duration-300 hover:font-semibold font-mono text-[16px] hover:bg-[#004EBB]">Novo no site? Cadastre-se aqui!</button>
                </div>
            </div>
        </div>
    
    )
}