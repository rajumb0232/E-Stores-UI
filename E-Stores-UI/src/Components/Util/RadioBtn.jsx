import { RxCheck } from "react-icons/rx";
import { RxCross2 } from "react-icons/rx";

const RadioBtn = ({ value, onChange, state }) => {
  return (
    <div className="w-max font-semibold text-slate-500">
      <div className="w-full flex justify-center items-center m-2">
        <p className="text-base">{value}</p>
        <div className="w-12 flex justify-start items-center">
          <button
            className={`ml-2 h-max w-9 p-0.5 text-base border border-pallete_zero flex items-center justify-center rounded-3xl transition-transform duration-500 overflow-clip ${
              state ? " bg-pallete_one" : " bg-gray-300"
            }`}
            onClick={() => onChange()}
            type="button"
          >
            <div
              className={`h-4 w-4 rounded-full bg-white border border-pallete_zero text-sm font-extrabold transition-transform duration-300 ${
                state
                  ? "text-pallete_zero translate-x-2/4"
                  : " text-pallete_zero -translate-x-2/4"
              }`}
            >
              {state ? <RxCheck /> : <RxCross2 />}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RadioBtn;
