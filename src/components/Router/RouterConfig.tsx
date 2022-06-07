import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../Layout/Layout";
import { Admin } from "../Page/Admin";
import { Home } from "../Page/Home";

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
