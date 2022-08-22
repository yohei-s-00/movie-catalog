import { FC } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "@components/Layout/Layout";
import { Admin } from "@components/Page/Admin";
import { Home } from "@components/Page/Home";
import { AddContent } from "@components/Page/AddContent";
import { Login } from "@components/Page/Login";
import { Edit } from "@components/Page/Edit";
import { AuthRouteGuard } from "./AuthRouteGuard";
import { EditContent } from "@components/Page/EditContent";

export const RouterConfig: FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="admin">
              <Route
                index
                element={
                  <AuthRouteGuard redirect="/">
                    <Admin />
                  </AuthRouteGuard>
                }
              />
              <Route
                path="addContent"
                element={
                  <AuthRouteGuard redirect="/">
                    <AddContent />
                  </AuthRouteGuard>
                }
              />
              <Route
                path="editContent"
                element={
                  <AuthRouteGuard redirect="/">
                    <Edit />
                  </AuthRouteGuard>
                }
              />
              <Route
                path="editContent/:id"
                element={
                  <AuthRouteGuard redirect="/">
                    <EditContent />
                  </AuthRouteGuard>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};
