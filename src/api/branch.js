export async function getBranches() {
  return fetch("/lotte_sort_branch/data/branches.json").then((response) => response.json());
}
