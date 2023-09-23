import { FC, ChangeEvent, MouseEvent } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export const Query: FC<{
  handleTextChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  text: string;
  handleFire: (e: MouseEvent<HTMLButtonElement>) => void;
  loading: boolean;
}> = ({ handleTextChange, text, handleFire, loading }) => {
  return (
    <form className="w-full flex justify-center p-7 relative">
      <textarea
        rows={3}
        onChange={handleTextChange}
        placeholder="Type some text to convert your vision into reality..."
        value={text}
        className="p-4 pr-16 w-1/2 focus:outline-none shadow-sm shadow-slate-800 border border-slate-800 resize-none rounded-md bg-slate-900 text-white text-lg"
      ></textarea>
      <button
        disabled={loading}
        type="submit"
        onClick={handleFire}
        className="-m-12"
      >
        <PaperAirplaneIcon
          className={`h-8 w-8 text-slate-300 hover:text-white ${
            loading
              ? "text-slate-500 hover:text-slate-500"
              : ""
          }`}
          fontSize={16}
        />
      </button>
    </form>
  );
};

export default Query;
