import React, { ReactNode, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import background from "./images/background.jpg";
import arona from "./images/arona.jpg";
import aru from "./images/aru.jpg";
import { faGear, faList } from "@fortawesome/free-solid-svg-icons";

import runMolu from "mollang-core";
import EXAMPLES from "./data/examples";

const App: React.FC = () => {
  const [githubShow, setGithubShow] = useState(false);
  const codeRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [showSidebar, setShowSidebar] = useState<
    "examples" | "settings" | false
  >("examples");
  const [maxRecursion, setMaxRecursion] = useState(100000);

  const [chatList, setChatList] = useState<
    {
      type: "input" | "output";
      content: string | ReactNode;
      exitCode?: number;
      error?: string | null;
    }[]
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
        <div className="h-5/6 w-5/6 md:h-4/5 lg:h-3/4 xl:w-5/6 2xl:w-4/6 mb-14 rounded-xl">
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
                style={{
                  backgroundColor:
                    showSidebar === "examples" ? "#5d6e86" : undefined,
                }}
                onClick={() =>
                  setShowSidebar(
                    showSidebar === "examples" ? false : "examples"
                  )
                }
              >
                <FontAwesomeIcon icon={faList} fontSize={40} />
              </div>
              <div
                className="Sidebar-button w-full h-16 flex justify-center items-center cursor-pointer"
                style={{
                  backgroundColor:
                    showSidebar === "settings" ? "#5d6e86" : undefined,
                }}
                onClick={() =>
                  setShowSidebar(
                    showSidebar === "settings" ? false : "settings"
                  )
                }
              >
                <FontAwesomeIcon icon={faGear} fontSize={40} fontWeight={200} />
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
            {showSidebar === "examples" ? (
              <div className="w-1/3 bg-slate-100 hidden md:flex flex-col gap-2 py-2">
                <div className="px-2.5 text-lg">예제 불러오기</div>
                <hr />
                <div
                  className="h-12 bg-slate-200 flex items-center p-2 text-xl mx-2 rounded-lg cursor-pointer"
                  onClick={() => {
                    codeRef.current!.value = EXAMPLES.helloworld;
                  }}
                >
                  helloworld.molu
                </div>
                <div className="mt-auto flex flex-col gap-2">
                  <a
                    className="h-12 bg-slate-200 flex items-center p-2 text-xl mx-2 rounded-lg"
                    href="https://github.com/ArpaAP/mollang"
                    target="_blank"
                    rel="noreferrer"
                  >
                    몰랭 문법 가이드
                  </a>
                  <a
                    className="h-12 bg-slate-200 flex items-center p-2 text-xl mx-2 rounded-lg"
                    href="https://github.com/ArpaAP/mollang/tree/main/examples"
                    target="_blank"
                    rel="noreferrer"
                  >
                    전체 예제 보기
                  </a>
                </div>
              </div>
            ) : showSidebar === "settings" ? (
              <div className="w-1/3 bg-slate-100 hidden md:flex flex-col gap-2 py-2">
                <div className="px-2.5 text-lg">인터프리터 설정</div>
                <hr />
                <div className="px-2.5 py-1.5 text-xl flex justify-between items-center">
                  <span className="flex-shrink-0">구현체 버전:</span>
                  <select className="ml-4 p-2 rounded-lg outline-none">
                    <option value="1.0">v1.0</option>
                  </select>
                </div>
                <hr />
                <div className="px-2.5 py-1.5">
                  <div className="text-xl flex justify-between items-center mb-1">
                    <span className="flex-shrink-0" defaultValue={60}>
                      루프 깊이 한계:
                    </span>
                    <input
                      type="text"
                      className="ml-4 p-2 rounded-lg w-full outline-none text-right"
                      value={maxRecursion}
                      min={0}
                      onChange={(e) => {
                        let value = Number(e.target.value);
                        if (isNaN(value)) return;

                        setMaxRecursion(Math.max(value, 0));
                      }}
                    />
                  </div>
                  <small className="px-0.5 text-sm font-light text-gray-500">
                    이 횟수 이상 루프가 반복되면 오류를 발생시키고 프로그램을
                    종료합니다. 0으로 설정하면 무한 루프를 허용합니다.
                  </small>
                </div>
                <hr />
              </div>
            ) : null}
            <div className="w-full flex flex-col rounded-br-xl">
              <div
                className="h-full backdrop-blur-sm p-6 flex flex-col gap-4 overflow-y-scroll scrollbar"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.75)" }}
              >
                {chatList.map((chat, index) => (
                  <div key={index} ref={bottomRef}>
                    {chat.type === "output" ? (
                      <div className="flex flex-col gap-4">
                        <div className="flex lg:mr-28 xl:mr-48">
                          <img
                            className="rounded-full mt-2 mr-4 h-12 w-12 md:h-20 md:w-20"
                            alt=""
                            src={arona}
                          />
                          <div className="flex flex-col">
                            <span className="text-xl lg:text-2xl text-gray-800">
                              아로나
                            </span>
                            <div
                              className="rounded-xl text-white text-xl lg:text-2xl px-3 py-2 mt-1.5 whitespace-pre-wrap mr-auto"
                              style={{ backgroundColor: "#4b5a6f" }}
                            >
                              {chat.content ? (
                                chat.content !== "undefined" ? (
                                  chat.content
                                ) : (
                                  <i>(값이 존재하지 않습니다.)</i>
                                )
                              ) : (
                                <i>(실행 결과가 없습니다.)</i>
                              )}
                            </div>
                            {chat.exitCode !== undefined && !chat.error ? (
                              <div
                                className="rounded-xl text-white text-xl lg:text-2xl px-3 py-2 mt-1.5 whitespace-pre-wrap mr-auto"
                                style={{ backgroundColor: "#4b5a6f" }}
                              >
                                종료 코드: {chat.exitCode}
                              </div>
                            ) : null}
                          </div>
                        </div>
                        {chat.error && (
                          <div className="flex lg:mr-28 xl:mr-48">
                            <img
                              className="rounded-full mt-2 mr-4 h-12 w-12 md:h-20 md:w-20"
                              alt=""
                              src={aru}
                            />
                            <div className="flex flex-col">
                              <span className="text-xl lg:text-2xl text-gray-800">
                                아루
                              </span>
                              <div
                                className="rounded-xl text-white text-xl lg:text-2xl px-3 py-2 mt-1.5 whitespace-pre-wrap mr-auto"
                                style={{ backgroundColor: "#4b5a6f" }}
                              >
                                {chat.error}
                              </div>
                              {chat.exitCode !== undefined ? (
                                <div
                                  className="rounded-xl text-white text-xl lg:text-2xl px-3 py-2 mt-1.5 whitespace-pre-wrap mr-auto"
                                  style={{ backgroundColor: "#4b5a6f" }}
                                >
                                  종료 코드: {chat.exitCode}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div
                        ref={bottomRef}
                        className="flex justify-end lg:ml-28 xl:ml-48"
                      >
                        <div className="rounded-xl text-white bg-blue-400 text-xl lg:text-2xl px-3 py-2 mt-1.5 whitespace-pre-wrap">
                          {chat.content}
                        </div>
                      </div>
                    )}
                    {chatList[index + 1] &&
                      chatList[index + 1].type !== chat.type && (
                        <div className="h-4" />
                      )}
                  </div>
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
                    className="w-20 h-full text-xl bg-blue-400 hover:brightness-110 transition-all duration-300"
                    onClick={async () => {
                      let code = codeRef.current!.value;
                      let newChatList = [...chatList];

                      newChatList = newChatList.concat({
                        type: "input",
                        content: code,
                      });

                      setChatList(newChatList);

                      let result = runMolu(code, {
                        inputFn: () => "1",
                        maxRecursion,
                      });
                      console.log(result);

                      newChatList = newChatList.concat({
                        type: "output",
                        content: result[0].join("") as string,
                        exitCode: result[0][0] ? 0 : (result[1][0] as number),
                        error: (result[2][0] as string) ?? null,
                      });

                      setChatList(newChatList);

                      setTimeout(
                        () =>
                          bottomRef.current?.scrollIntoView({
                            behavior: "smooth",
                          }),
                        10
                      );
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
