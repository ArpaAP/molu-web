import React, { ReactNode, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import background from "./images/background.jpg";
import arona from "./images/arona.jpg";
import { faList } from "@fortawesome/free-solid-svg-icons";

import runMolu from "./mollang/index";

const App: React.FC = () => {
  const [githubShow, setGithubShow] = useState(false);
  const codeRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const [chatList, setChatList] = useState<
    { type: "input" | "output"; content: string | ReactNode }[]
  >([
    {
      type: "output",
      content:
        "몰랭 웹 인터프리터에 오신 것을 환영합니다!\n이곳에서 몰랭 코드를 실행하고 결과를 확인할 수 있습니다!",
    },
  ]);

  return (
    <div className="overflow-hidden">
      <div
        className="h-screen flex justify-center items-center bgBlur"
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backdropFilter: "blur(10px) brightness(70%)",
        }}
      >
        <div className="h-5/6 w-5/6 md:h-4/5 lg:h-3/4 2xl:w-4/6 mb-14 rounded-xl">
          <header className="h-16 bg-sky-400 shadow-xl rounded-t-xl flex items-center text-2xl lg:text-3xl text-white px-5">
            몰랭 웹 인터?프리터
            <span className="ml-3" style={{ fontSize: 17 }}>
              by ArpaAP
            </span>
          </header>
          <div className="flex shadow-xl h-full rounded-b-xl">
            <nav
              className="w-24 bg-sky-400 rounded-bl-xl text-white flex flex-col"
              style={{ backgroundColor: "#4b5a6f" }}
            >
              <div
                className="Sidebar-button w-full h-16 flex justify-center items-center cursor-pointer"
                onClick={() => setShowSidebar(!showSidebar)}
              >
                <FontAwesomeIcon icon={faList} fontSize={40} />
              </div>
              <div className="relative mt-auto">
                {githubShow && (
                  <div className="w-52 absolute left-3 bottom-16 bg-white text-gray-800 text-xl shadow-lg rounded-xl">
                    <a
                      className="hover:bg-gray-100 rounded-xl px-3 py-1.5 block"
                      href="https://github.com/ArpaAP/mollang"
                      target="_blank"
                      rel="noreferrer"
                    >
                      몰랭 언어
                    </a>

                    <a
                      className="hover:bg-gray-100 rounded-xl px-3 py-1.5 block"
                      href="https://github.com/ArpaAP/molu-web"
                      target="_blank"
                      rel="noreferrer"
                    >
                      몰랭 웹 인터프리터
                    </a>
                  </div>
                )}
                <div
                  className="Sidebar-button w-full h-16 flex justify-center items-center rounded-bl-xl cursor-pointer"
                  onClick={() => setGithubShow(!githubShow)}
                >
                  <FontAwesomeIcon icon={faGithub} fontSize={40} />
                </div>
              </div>
            </nav>
            {showSidebar && (
              <div className="w-1/3 bg-slate-100 hidden md:block">
                <div className="h-12 bg-slate-200 flex items-center p-2 text-xl m-2 rounded-lg">
                  main.molu
                </div>
                <a
                  className="h-12 bg-slate-200 flex items-center p-2 text-xl m-2 rounded-lg"
                  href="https://github.com/ArpaAP/mollang/tree/main/examples"
                  target="_blank"
                  rel="noreferrer"
                >
                  예제 보기
                </a>
              </div>
            )}
            <div className="w-full flex flex-col rounded-br-xl">
              <div
                className="h-full backdrop-blur-sm p-6 flex flex-col gap-2 overflow-y-scroll scrollbar"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
              >
                {chatList.map((chat, index) => (
                  <>
                    {chat.type === "output" ? (
                      <div
                        key={index}
                        ref={bottomRef}
                        className="flex lg:mr-28 xl:mr-48"
                      >
                        <img
                          className="rounded-full mt-2 mr-4 h-12 w-12 md:h-20 md:w-20"
                          alt=""
                          src={arona}
                        />
                        <div>
                          <span className="text-xl lg:text-2xl text-gray-800">
                            메로나
                          </span>
                          <div
                            className="rounded-xl text-white text-xl lg:text-2xl px-3 py-2 mt-1.5"
                            style={{ backgroundColor: "#4b5a6f" }}
                          >
                            {chat.content ? (
                              chat.content !== "undefined" ? (
                                chat.content
                              ) : (
                                <i>(값이 없습니다.)</i>
                              )
                            ) : (
                              "모오오오오올루"
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        key={index}
                        ref={bottomRef}
                        className="flex justify-end lg:ml-28 xl:ml-48"
                      >
                        <div className="rounded-xl text-white bg-blue-400 text-xl lg:text-2xl px-3 py-2 mt-1.5">
                          {chat.content ?? "모오오오오올루"}
                        </div>
                      </div>
                    )}
                    {chatList[index + 1] &&
                      chatList[index + 1].type !== chat.type && (
                        <div className="h-4" />
                      )}
                  </>
                ))}
              </div>
              <div className="h-52 w-full flex bg-slate-300 rounded-br-xl">
                <textarea
                  ref={codeRef}
                  className="w-full h-full resize-none outline-none p-2"
                  spellCheck="false"
                  placeholder="몰랭 코드 입력..."
                  style={{ fontFamily: "Consolas, Gulim" }}
                />
                <div className="flex flex-col">
                  <button
                    type="button"
                    className="w-16 h-full text-xl bg-blue-400 hover:brightness-110 transition-all duration-300"
                    onClick={async () => {
                      let code = codeRef.current!.value;
                      let newChatList = [...chatList];

                      newChatList = newChatList.concat({
                        type: "input",
                        content: code,
                      });

                      setChatList(newChatList);

                      let result = await runMolu(code);

                      newChatList = newChatList.concat({
                        type: "output",
                        content: result[0],
                      });

                      setChatList(newChatList);

                      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    실행
                  </button>
                  <button
                    type="button"
                    className="bg-slate-200 hover:brightness-105 rounded-br-xl transition-all duration-300"
                    onClick={() =>
                      setChatList([
                        {
                          type: "output",
                          content: <i>(실행 내역을 지웠습니다.)</i>,
                        },
                      ])
                    }
                  >
                    지우기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
