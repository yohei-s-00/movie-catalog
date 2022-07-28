import { useLocation, useNavigate } from "react-router-dom";

//　現在ページのスラッグ取得
export const usePageSlug = () => {
  let location = useLocation();
  console.log(location)
  return location.pathname;
};
export const useLink = () => {
  const navigation = useNavigate();
  return navigation
}