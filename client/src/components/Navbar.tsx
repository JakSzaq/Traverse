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
    <div className="navbar w-full h-12 absolute top-0 flex justify-between items-center py-8 px-4 xs:px-6 z-20">
      <div className="nav_left w-28">
        <img
          className="cursor-pointer"
          onClick={() => navigate("/dashboard")}
          src={logo}
        />
      </div>
      <div className="nav_right flex flex-row gap-3 xs:gap-8">
        <div className="group notifications cursor-pointer w-auto h-7 px-2 flex justify-center gap-3 items-center bg-black rounded-md text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
          <img className="w-3" src={bellIcon} />
          <p className="hidden sm:block font-bold">0</p>
          <div className="opacity-0 duration-200 group-hover:opacity-100 pointer-events-none notification-list absolute bg-primary-color h-auto w-56 sm:w-72 -bottom-20 rounded-full flex items-center justify-center py-4">
            <div className="relative -top-4 w-8 h-8 bg-primary-color rotate-45"></div>
            <h2 className="absolute w-full text-lg text-center font-bold h-full flex items-center justify-center leading-6">
              Nie masz obecnie żadnych powiadomień
            </h2>
          </div>
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
