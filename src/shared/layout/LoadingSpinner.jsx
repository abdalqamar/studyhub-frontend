import { FadeLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 w-screen h-screen bg-black/10 backdrop-blur-sm flex items-center justify-center z-[999999]">
      <FadeLoader color="#1E90FF" />
    </div>
  );
};

export default LoadingSpinner;
