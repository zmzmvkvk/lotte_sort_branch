export async function getBranches() {
  return fetch("/public/data/branches.json").then((response) => response.json());
}
