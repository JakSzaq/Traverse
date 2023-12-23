import { useNavigate } from "react-router-dom";
import logo from "../assets/welcome_logo.svg";
import bellIcon from "../assets/icons/bell_icon.svg";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.reload();
  };
  return (
    <div className="navbar w-full h-12 absolute top-0 flex justify-between items-center py-8 px-6">
      <div className="nav_left w-28">
        <img
          className="cursor-pointer"
          onClick={() => navigate("/dashboard")}
          src={logo}
        />
      </div>
      <div className="nav_right flex flex-row gap-8">
        <div className="notifications w-[3.25rem] h-7 px-2 flex justify-between items-center bg-black rounded-md text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <img className="w-3" src={bellIcon} />
          <p className="font-bold">0</p>
        </div>
        <button
          className="sign_out w-30 h-6 text-lg font-semibold"
          onClick={handleSignOut}
        >
          WYLOGUJ
        </button>
      </div>
    </div>
  );
};

export default Navbar;
