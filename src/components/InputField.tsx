import Arrow from "../assets/images/icon-arrow.svg";
import { useMediaQuery } from "react-responsive";
import "../App.css";
import patternBgDesktop from "../assets/images/pattern-bg-desktop.png";
import patternBgMobile from "../assets/images/pattern-bg-mobile.png";

interface InputFieldProps {
  onClick?: (event: React.FormEvent) => void;
  InputRef: React.RefObject<HTMLInputElement>;
  Loading: boolean;
}

function InputField({ onClick, InputRef, Loading }: InputFieldProps) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const backgroundImage = isMobile
    ? `url(${patternBgMobile})`
    : `url(${patternBgDesktop})`;

  return (
    <>
      <div
        className={`relative z-10 w-full h-2/5 bg-center bg-no-repeat bg-cover flex flex-col items-center md:p-12 md:gap-14 p-4 gap-2`}
        style={{ backgroundImage }}
      >
        <h1 className="text-white lg:text-4xl text-2xl font-medium">
          IP Address Tracker
        </h1>
        <form
          onSubmit={onClick}
          action=""
          className="md:w-3/6 w-full h-14 rounded-xl flex overflow-hidden"
        >
          <input
            className="w-full h-full outline-none p-5 text-lg"
            type="text"
            placeholder="Search for any IP address or domain"
            ref={InputRef}
          />
          {Loading ? (
            <button type="submit" className="bg-VeryDarkGray w-16" disabled>
              <div className="loader"></div>
            </button>
          ) : (
            <button
              type="submit"
              className="bg-VeryDarkGray w-16 group transition-all duration-100"
            >
              <img
                src={Arrow}
                alt=""
                className="m-auto group-hover:scale-125 transition-all duration-100"
              />
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default InputField;
