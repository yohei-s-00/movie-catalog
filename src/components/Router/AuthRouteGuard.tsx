import { useIsLogin } from "@hooks/globalstate";
import { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  children: ReactNode;
  redirect: string;
};

export const AuthRouteGuard: FC<Props> = ({ children, redirect }) => {
  const [isLogin, setIsLogin] = useIsLogin();
  if (!isLogin) {
    return (
      <Navigate to={redirect} replace />
    );
  }
  return <>{children}</>;
};
