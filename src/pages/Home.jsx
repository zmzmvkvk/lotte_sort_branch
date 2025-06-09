import React, { useState } from "react";
import Form from "../components/Home/Form";
import Results from "../components/Home/Results";
import { useQuery } from "@tanstack/react-query";
import { getBranches } from "../api/branch";

export default function Home() {
  const [sortedText, setSortedText] = useState([]);
  const [errorText, setErrorText] = useState([]);
  const [sortMode, setSortMode] = useState("default");

  const { isLoading, data } = useQuery({ queryKey: ["branches"], queryFn: getBranches });
  const branches = data ? Object.entries(data)[0][1] : [];

  const getCharTypeOrder = (str) => {
    const ch = str.trim().charAt(0);
    if (/^[가-힣]/.test(ch)) return 1; // 완성형 한글
    if (/^[ㄱ-ㅎ]/.test(ch)) return 2; // 자음 단독
    if (/^[A-Za-z]/.test(ch)) return 3; // 영어
    if (/^[0-9]/.test(ch)) return 4; // 숫자
    return 5; // 기타
  };

  const customSort = (a, b) => {
    const aType = getCharTypeOrder(a);
    const bType = getCharTypeOrder(b);

    if (aType !== bType) return aType - bType;
    return a.localeCompare(b, "ko-KR");
  };

  const submitHandler = (text) => {
    const rawList = text
      .split(/[/,·|?:&*.]/)
      .map((v) => v.trim())
      .filter(Boolean);

    if (sortMode === "korean") {
      setErrorText([]);
      const sorted = [...rawList].sort(customSort);
      setSortedText(sorted);
      return;
    }

    setErrorText([]);
    const matched = rawList
      .map((keyword) => {
        let baseKeyword = keyword.replace(/점$/, "");
        if (baseKeyword === "부본") baseKeyword = "부산본";
        else if (baseKeyword === "산본") baseKeyword = "피트인 산본";

        const pattern = new RegExp(baseKeyword, "i");
        const result = branches.find((branch) => pattern.test(branch.branch));

        if (result) return result.branch;
        setErrorText((prev) => [...prev, keyword]);
        return null;
      })
      .filter(Boolean);

    const sorted = [...matched].sort((a, b) => {
      const branchA = branches.find((branch) => branch.branch === a);
      const branchB = branches.find((branch) => branch.branch === b);
      return (branchA?.id || 9999) - (branchB?.id || 9999);
    });

    setSortedText(sorted);
  };

  return (
    <div className="p-5">
      <div className="mb-5">
        <label htmlFor="sortMode" className="mr-3 font-bold">
          정렬 방식:
        </label>
        <select id="sortMode" className="border px-2 rounded-xl py-1" value={sortMode} onChange={(e) => setSortMode(e.target.value)}>
          <option className="bg-zinc-700" value="default">
            지점명 정렬
          </option>
          <option className="bg-zinc-700" value="korean">
            브랜드명 정렬
          </option>
        </select>
      </div>

      <Form onSubmitHandler={submitHandler} />
      <Results text={sortedText} total={sortedText.length} />

      {errorText.length > 0 && sortMode === "default" && (
        <div className="mt-3 text-red-500">
          <strong>⚠️ 존재하지 않는 지점 :</strong> {errorText.join(", ")}
        </div>
      )}

      <p className="mt-3">※ 중복지점명인 롯데백화점(구리점), 롯데아울렛(구리점)은 수동으로 순서 바꿔주세요.</p>
    </div>
  );
}
