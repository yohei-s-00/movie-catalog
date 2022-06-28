import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@components/Layout/Layout";
import { Admin } from "@components/Page/Admin";
import { Home } from "@components/Page/Home";

export const RouterConfig: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path="admin" element={<Admin />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
