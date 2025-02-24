import { useQuery } from "@tanstack/react-query";
import { getBranches } from "../../api/branch";
import HeaderBranch from "./HeaderBranch";

export default function HeaderBranchBranchLists() {
  const { isLoading, data } = useQuery({ queryKey: ["branches"], queryFn: getBranches });
  const branches = data ? Object.entries(data)[0][1] : [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      <li>
        <p>백화점</p>
        <ul>
          <li>
            <p>서울점</p>
            {branches.map((v) => {
              if (v.type == "백화점" && v.type2 == "서울점") {
                return <HeaderBranch key={v.id}>{v.branch}</HeaderBranch>;
              }
            })}
          </li>
          <li>
            <p>수도권점</p>
            {branches.map((v) => {
              if (v.type == "백화점" && v.type2 == "수도권점") {
                return <HeaderBranch key={v.id}>{v.branch}</HeaderBranch>;
              }
            })}
          </li>
          <li>
            <p>지방점</p>
            {branches.map((v) => {
              if (v.type == "백화점" && v.type2 == "지방점") {
                return <HeaderBranch key={v.id}>{v.branch}</HeaderBranch>;
              }
            })}
          </li>
        </ul>
      </li>
      <li>
        <p>아울렛</p>
        <ul>
          <li>
            <p>프리미엄 아울렛</p>
            {branches.map((v) => {
              if (v.type == "아울렛" && v.type2 == "프리미엄 아울렛") {
                return <HeaderBranch key={v.id}>{v.branch}</HeaderBranch>;
              }
            })}
          </li>
          <li>
            <p>아울렛</p>
            {branches.map((v) => {
              if (v.type == "아울렛" && v.type2 == "아울렛") {
                return <HeaderBranch key={v.id}>{v.branch}</HeaderBranch>;
              }
            })}
          </li>
        </ul>
      </li>
      <li>
        <p>쇼핑몰</p>
        {branches.map((v) => {
          if (v.type == "쇼핑몰") {
            return <HeaderBranch key={v.id}>{v.branch}</HeaderBranch>;
          }
        })}
      </li>
      <li>
        <p>타임빌라스</p>
        {branches.map((v) => {
          if (v.type == "타임빌라스") {
            return <HeaderBranch key={v.id}>{v.branch}</HeaderBranch>;
          }
        })}
      </li>
    </ul>
  );
}
