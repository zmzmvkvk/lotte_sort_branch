import React, { useEffect, useState } from "react";
import Form from "../components/Home/Form";
import Results from "../components/Home/Results";
import { useQuery } from "@tanstack/react-query";
import { getBranches } from "../api/branch";

export default function Home() {
  const [sortedText, setSortedText] = useState([]);
  const [errorText, setErrorText] = useState([]);
  const { isLoading, data } = useQuery({ queryKey: ["branches"], queryFn: getBranches });
  const branches = data ? Object.entries(data)[0][1] : [];

  // branch = { id: 55, branch: "진주점", type: "쇼핑몰", type2: "" }
  // 본점,부여점,센텀시티점,잠실점,군산점,서울역점,수원점,관악점,건대
  // 본점/부여점/센텀시티점/잠실점/군산점/서울역점/수원점/관악점/건대/부본
  // 본점,부여점/센텀시티점,잠실점/군산점,서울역점/수원점·관악점/건대/부본·이시아?율하.광교:의왕점*중동점,산본

  const submitHandler = (text) => {
    setErrorText([]);

    const branchNames = text && text.split(/[/,·|?:&*.]/).map((branch) => branch.trim());

    const sorted = branchNames
      .map((keyword) => {
        let baseKeyword = keyword.replace(/점$/, "");
        if (baseKeyword === "부본") {
          baseKeyword = "부산본";
        } else if (baseKeyword === "산본") {
          baseKeyword = "피트인 산본";
        }

        const pattern = new RegExp(baseKeyword, "i");
        const result = branches.find((branch) => pattern.test(branch.branch));

        if (result) {
          return result.branch;
        } else {
          setErrorText((prev) => [...prev, keyword]);
          return null;
        }
      })
      .filter((v) => v !== null)
      .sort((a, b) => {
        const branchA = branches.find((branch) => branch.branch === a);
        const branchB = branches.find((branch) => branch.branch === b);
        return (branchA?.id || 9999) - (branchB?.id || 9999);
      });

    setSortedText(sorted);
  };

  return (
    <div className="p-5">
      <Form onSubmitHandler={submitHandler} />
      <Results text={sortedText} total={sortedText.length} />

      {errorText.length > 0 && (
        <div className="mt-3 text-red-500">
          <strong>⚠️ 존재하지 않는 지점 :</strong> {errorText.join(", ")}
        </div>
      )}

      <p className="mt-3">※ 중복지점명인 롯데백화점(구리점), 롯데아울렛(구리점)은 수동으로 순서 바꿔주세요.</p>
    </div>
  );
}
