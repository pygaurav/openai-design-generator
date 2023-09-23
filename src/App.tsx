import "./App.css";
import { ChangeEvent, useState, MouseEvent } from "react";
import { CodeBracketSquareIcon } from "@heroicons/react/24/solid";
import axios, { AxiosResponse } from "axios";
import Query from "./components/Query";
import Loading from "./components/Loading";
import CodeEditor from "./components/CodeEditor";
import Alert from "./components/Alert";
import HeroSection from "./containers/HeroSection";

function App() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [codeView, setCodeView] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const handleChangeQuery: (e: ChangeEvent<HTMLTextAreaElement>) => void = (
    e
  ) => {
    setQuery(e.target.value);
  };

  const submitQuery = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response: AxiosResponse = await axios.post<{
        message: { content: string };
      }>("http://localhost:3000/", {
        content: query,
      });
      setLoading(false);
      const choices = response.data.choices;
      const content = choices[choices.length - 1].message.content;
      setResponse(content);
      setQuery("");
    } catch (e) {
      setErrorMessage(`Something went wrong! ${e}`);
      setLoading(true);
      setAlertOpen(true);
    }
  };
  return (
    <div className="bg-gradient-to-tr from-black from-10% via-slate-950 via-60% to-slate-900 to-90% h-screen">
      <Alert
        message={errorMessage}
        open={alertOpen}
        handleClose={() => setAlertOpen(false)}
      />
      <div className="h-[calc(100vh-175px)]">
        {isLoading && <Loading />}
        {!response && <HeroSection />}
        {response && (
          <div
            className="z-20"
            style={{ padding: "2rem", position: "relative" }}
          >
            <button
              className="bg-gray-800 absolute right-[32px] p-2 z-20"
              onClick={() => setCodeView(!codeView)}
            >
              <div className="flex items-center">
                <CodeBracketSquareIcon className="h-8 w-8 text-slate-300" />
                <span className="text-slate-100">
                  {codeView ? "Design" : "Source"}
                </span>
              </div>
            </button>
            <div className="w-full h-[calc(100vh-205px)] px-4">
              {codeView ? (
                <CodeEditor code={response} language="html" />
              ) : (
                <iframe srcDoc={response} className="w-full h-full" />
              )}
            </div>
          </div>
        )}
      </div>

      <div className="fixed flex justify-center w-full mx-auto bottom-0">
        <Query
          text={query}
          handleFire={submitQuery}
          handleTextChange={handleChangeQuery}
          loading={isLoading}
        />
      </div>
    </div>
  );
}

export default App;
