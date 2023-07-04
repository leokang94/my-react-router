import { useRouterContext } from "./Router.context";
import { useEffect } from "react";

type RouteProps = {
  path: string;
  component: React.ReactNode;
};

export const Route: React.FC<RouteProps> = ({ path, component }) => {
  const { routerMap, pushToMap } = useRouterContext();

  const canRender = path === window.location.pathname;

  useEffect(() => {
    pushToMap(path, component);
  }, [pushToMap, path, component]);

  return <>{canRender && routerMap.get(window.location.pathname)}</>;
};
