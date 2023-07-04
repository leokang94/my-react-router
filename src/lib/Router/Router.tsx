type RouterProps = {
  children: React.ReactNode;
};
const Router: React.FC<RouterProps> = ({ children }) => {
  return <>{children}</>;
};

export default Router;
