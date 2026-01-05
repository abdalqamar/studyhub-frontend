import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { warningToast } from "../../utils/toastUtils";

const SocialLoginButtons = () => {
  const handleClick = async () => {
    warningToast("this features is comming soon! Please login via credintilas");
  };
  return (
    <div className="flex justify-center items-center gap-4 sm:gap-6">
      <button
        onClick={handleClick}
        className="flex items-center cursor-pointer justify-center gap-2 px-4 py-2 bg-slate-700/40 border border-slate-600/50 rounded-2xl text-white hover:bg-slate-600/50 transition-transform hover:-translate-y-1 shadow-md"
        type="button"
      >
        <FcGoogle size={20} />
        Google
      </button>

      <button
        onClick={handleClick}
        className="flex items-center cursor-pointer justify-center gap-2 px-4 py-2 bg-slate-700/40 border border-slate-600/50 rounded-2xl text-white hover:bg-slate-600/50 transition-transform hover:-translate-y-1 shadow-md"
        type="button"
      >
        <FaGithub size={20} />
        GitHub
      </button>
    </div>
  );
};

export default SocialLoginButtons;
