import { FadeLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className=" isolate aspect-video h-screen bg-primary-color/40 backdrop-blur w-full flex justify-center items-center">
      <FadeLoader color="#ad2b08" />
    </div>
  );
};

export default Loading;
