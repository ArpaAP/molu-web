import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import background from "./images/background.jpg";

const App: React.FC = () => {
  return (
    <div
      className="h-screen flex justify-center items-center bgBlur"
      style={{
        backgroundImage: `url(${background})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backdropFilter: "blur(10px) brightness(70%)",
      }}
    >
      <div className="h-3/4 w-4/6 rounded-xl">
        <header className="h-16 bg-sky-400 shadow-xl rounded-t-xl flex items-center text-3xl text-white px-5">
          몰랭 웹 인터?프리터
        </header>
        <div className="flex bg-slate-50 shadow-xl h-full rounded-b-xl">
          <nav
            className="w-18 bg-sky-400 px-5 rounded-bl-xl text-white flex flex-col justify-end py-5"
            style={{ backgroundColor: "#4b5a6f" }}
          >
            <FontAwesomeIcon icon={faGithub} fontSize={40} />
          </nav>
          <div
            className="w-full rounded-br-xl"
            style={{ backgroundColor: "#FFF7E2" }}
          >
            ㅁㄴㅇㄹ
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
