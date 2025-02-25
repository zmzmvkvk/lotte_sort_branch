import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBranches } from "../../api/branch";

export default function Results({ text }) {
  const [sortedText, setSortedText] = useState();

  const { isLoading, data } = useQuery({ queryKey: ["branches"], queryFn: getBranches });
  const branches = data ? Object.entries(data)[0][1] : [];
  const branchNames =
    text &&
    text
      .split(",")
      .map((branch) => branch.trim())
      .filter((branch) => branch !== "");

  // console.log((branch = { id: 55, branch: "진주점", type: "쇼핑몰", type2: "" }));
  // console.log(branchNames = 본점,부여점,센텀시티점,잠실점,군산점,서울역점,수원점,관악점,건대스타시티점);

  // console.log(branches);
  const sorted =
    branchNames &&
    branchNames
      .map((keyword) => {
        const baseKeyword = keyword.replace(/점$/, "");
        const pattern = new RegExp(baseKeyword + "(점)?$", "i");

        return branches.find((branch) => pattern.test(branch.branch));
      })
      .sort((a, b) => a.id - b.id);

  console.log(sorted);
  return (
    <div>
      <p>Results</p>
      <div className="flex-wrap">
        <select>
          <option className="bg-zinc-700">구분자 , (콤마)</option>
          <option className="bg-zinc-700">구분자 / (슬래시)</option>
          <option className="bg-zinc-700">구분자 · (가운뎃점)</option>
        </select>
        <div className="flex scroll-auto">
          <div className="w-10/11 h-60 bg-white"></div>
          <button className="indivne-block p-5 ml-5 border-2 border-gray-50 hover:cursor-pointer">복사</button>
        </div>
      </div>
    </div>
  );
}
