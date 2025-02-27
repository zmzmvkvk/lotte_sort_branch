import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Results({ text, total }) {
  const [status, setStatus] = useState({ total, split: "," });
  const result = useRef(text);

  const notify = () => {
    navigator.clipboard.writeText(result.current.innerText);
    toast("복사가 완료되었습니다");
  };

  const selectList = [
    { value: ",", name: "구분자 , (콤마)" },
    { value: "/", name: "구분자 / (슬래시)" },
    { value: "·", name: "구분자 · (가운뎃점)" },
  ];

  const handleStatus = (e) => {
    setStatus({ total, split: e.target.value });
  };

  return (
    <div>
      <span className="text-3xl">Result</span>
      <span className="ml-2 text-xl">
        총 <span className="text-red-500">{total}</span>개 지점
      </span>
      <div className="flex-wrap">
        <select className="my-3 border-1 rounded-xl p-1" onChange={handleStatus}>
          {selectList.map((item) => (
            <option className="bg-zinc-700" value={item.value} key={item.value}>
              {item.name}
            </option>
          ))}
        </select>
        <div className="flex scroll-auto">
          <div id="text" className="w-10/11 min-h-60 bg-white text-black p-2" ref={result}>
            {text.map((v, i) => {
              return (
                <span className="text-xl" key={i}>
                  {v == "구리점" ? <i className="text-red-500 font-bold not-italic">{v}</i> : <i className="not-italic">{v}</i>}
                  {i + 1 !== total && status.split == "," ? <span>{status.split} </span> : i + 1 !== total && <span> {status.split} </span>}
                </span>
              );
            })}
          </div>
          <button className="indivne-block p-5 ml-5 border-2 border-gray-50 hover:cursor-pointer" onClick={notify}>
            복사
          </button>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={2500} hideProgressBar />
    </div>
  );
}
