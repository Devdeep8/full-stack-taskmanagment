/* eslint-disable @next/next/no-img-element */
import Modal from "../../../../common/components/Modal";
import LoginComponents from "../../../login/components/loginform";
import { IMAGEOBJ } from "../../../../../public/assets";

const LoginModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={false}
      className="w-[95%] sm:max-w-m md:max-w-2xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl max-h-[92vh] rounded-xl overflow-hidden"
    >
      <div className="flex flex-col md:flex-row w-full items-center">
        {/* Left Image */}
        <div className="hidden md:block w-1/2 h-full">
          <img
            src={IMAGEOBJ.auth}
            alt="auth"
            className="w-full h-full object-cover rounded-l-xl"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-6">
          <div className=" flex flex-col gap-2 justify-center items-center">
            <h1 className=" text-center font-semibold text-2xl">Login </h1>

            <p className="relative flex justify-center items-center text-center w-full max-w-md my-1">
              <span className="grow border-t border"></span>
              <span className="px-4 text-sm ">Login with email</span>
              <span className="grow border-t border"></span>
            </p>
          </div>
          <div>
            <LoginComponents onClose={onClose} />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
