import { RouterProvider } from "./Router.context";

type RouterProps = {
  children: React.ReactNode;
};

export const Router: React.FC<RouterProps> = ({ children }) => {
  return <RouterProvider>{children}</RouterProvider>;
};
