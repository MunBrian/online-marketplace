import { TailSpin } from "react-loader-spinner";

const SpinnerLoader = () => {
  return (
    <div className="bg-white h-96 flex justify-center items-center ">
      <TailSpin
        height="120"
        width="120"
        color="#1e40af"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default SpinnerLoader;
