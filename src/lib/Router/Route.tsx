type RouteProps = {
  path: string;
  component: React.ReactNode;
};
const Route: React.FC<RouteProps> = ({ path, component }) => {
  return (
    <>
      <h1>{"<Route />"}</h1>
      <h2>path: {path}</h2>
      <h2>component</h2>
      {component}
    </>
  );
};

export default Route;
