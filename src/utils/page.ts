import page from "@/pages.json";
const pageobj = {};
const titleobj = {};
let tabbar = page.tabBar.list;
for (let val of page.pages) {
  const key = val.path.split("/")[1];
  pageobj[key] = "/" + val.path;
  titleobj[val.path] = val.style.navigationBarTitleText;
}
export { pageobj, titleobj,tabbar };
