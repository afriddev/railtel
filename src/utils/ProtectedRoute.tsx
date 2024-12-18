import { ReactNode } from "react";

interface ProtectedRouteInterface {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteInterface) {
  return <div>{children}</div>;
}
export default ProtectedRoute;
