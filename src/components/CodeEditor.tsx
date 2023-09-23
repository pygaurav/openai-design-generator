import Editor, { loader } from "@monaco-editor/react";
import { FC } from "react";

loader.init().then((monaco) => {
  monaco.editor.defineTheme("customTheme", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#0f172a",
    },
  });
});

const CodeEditor: FC<{ code: string; language: string }> = ({
  code,
  language,
}) => {
  return (
    <Editor
      height="100%"
      defaultLanguage={language}
      defaultValue={code}
      className="z-10"
      theme="customTheme"
      options={{
        fontSize: 18,
        autoIndent: true,
        formatOnType: true,
        formatOnPaste: true,
        codeLens: false,
      }}
    />
  );
};

export default CodeEditor;
