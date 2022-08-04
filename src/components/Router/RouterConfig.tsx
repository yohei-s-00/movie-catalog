import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@components/Layout/Layout";
import { Admin } from "@components/Page/Admin";
import { Home } from "@components/Page/Home";
import { AddContent } from "@components/Page/AddContent";
import { Login } from "@components/Page/Login";

export const RouterConfig: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />}/>
            <Route path="login" element={<Login />} />
            <Route path="admin">
              <Route index　element={<Admin />} />
              <Route path="addContent" element={<AddContent />}/>
              <Route path="editContent" element={<AddContent />}/>
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
