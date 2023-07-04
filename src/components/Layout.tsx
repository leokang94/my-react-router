import { useRouter } from "../lib/Router";
import { useEffect } from "react";

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentIndex, history } = useRouter();

  useEffect(() => {
    console.log(
      `currentIndex: ${currentIndex}, history: ${JSON.stringify(history)}`,
    );
  }, [currentIndex, history]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {children}
    </div>
  );
};
