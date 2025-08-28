import { NavLink, useNavigate } from "react-router-dom";
import icone from "../../assets/icone.png";
import apiLogin from "../../services/login"

export function HeaderPage() {
  const navigate = useNavigate();
  const token = apiLogin.getToken();
  const userId = apiLogin.getId()

  if(!userId){
    navigate("/login")
    return
  }

  function handleLogout() {
    apiLogin.deleteRefresh(userId!)
    apiLogin.logout();
    navigate("/");
  }

  return (
    <div className="flex items-center justify-between border-none h-20 bg-[#232A3E]">
      <img
        src={icone}
        alt="Login"
        onClick={() => navigate("/")}
        className="h-14 w-14 mx-5 cursor-pointer rounded-2xl pt-1 bg-[#3086FF] hover:bg-[#004EBB] transition ease-in-out duration-300"
      />
             
      {token ? (
        <>
        <div className="flex justify-center gap-10">
          <NavLink 
            to="/home"
            className={({ isActive }) => `px-4 py-2 rounded-3xl transition ease-in-out duration-300 font-mono text-[18px] font-semibold ${isActive ? "bg-[#004EBB] text-[#ffff] " : "text-[#ffff] hover:bg-[#3086FF] hover:scale-110 hover:-translate-y-1"} `}
          >
            Inicio
          </NavLink>
          <NavLink
            to="/set"
            className={({isActive}) => `px-4 py-2 rounded-3xl transition ease-in-out duration-300 font-mono text-[18px] font-semibold ${isActive ? "bg-[#004EBB] text-[#ffff] " : "text-[#ffff] hover:bg-[#3086FF] hover:scale-110 hover:-translate-y-1"} `}
          >
            Alterar
          </NavLink>
          <NavLink
            to="/info"
            className={({isActive}) => `px-4 py-2 rounded-3xl transition ease-in-out duration-300 font-mono text-[18px] font-semibold ${isActive ? "bg-[#004EBB] text-[#ffff] " : "text-[#ffff] hover:bg-[#3086FF] hover:scale-110 hover:-translate-y-1"} `}
          >
            Informações
          </NavLink>
        </div>
        <button
          onClick={handleLogout}
          className="hover:bg-[#004EBB] hover:scale-110 hover:-translate-y-1 transition ease-in-out delay-150 duration-300  bg-[#006AFF] rounded-3xl p-2 text-[#ffff] mx-5 font-mono text-[18px] font-semibold px-4" 
        >
          Sair
        </button> 
      </>
      ) : (
        <>
          <div className="mx-20"></div>
        </>
      )}
      
    </div>
  );
}