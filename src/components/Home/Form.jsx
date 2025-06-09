import React, { useState } from "react";

export default function Form({ onSubmitHandler }) {
  const [text, setText] = useState();

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    text.trim() && onSubmitHandler(text);
  };

  const pressEnter = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      return handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} onKeyDown={pressEnter} className="flex mb-10">
      <textarea placeholder="지점명 또는 브랜드명을 입력하세요." className="bg-white w-10/11 h-30 text-black p-2 max-h-40 min-h-20 !outline-none" onChange={handleChange} />
      <button className="p-5 ml-5 border-2 border-gray-50 hover:cursor-pointer">확인</button>
    </form>
  );
}
