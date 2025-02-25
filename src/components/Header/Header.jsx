import React from "react";
import HeaderBranchLists from "./HeaderBranchLists";
export default function Header() {
  return (
    <div className="p-5">
      <p className="py-1 mb-3">롯데백화점 지점순서</p>
      <HeaderBranchLists />
    </div>
  );
}
