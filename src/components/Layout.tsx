type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {children}
    </div>
  );
};
