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
    <div className="flex flex-wrap">
      {branches.map((v, i) => {
        if (branches.length == i + 1) {
          return v.branch;
        }
        return v.branch + ",";
      })}
    </div>
  );
}
