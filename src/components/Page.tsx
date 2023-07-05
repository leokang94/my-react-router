import { useRouter } from "../lib/Router";

type PageProps = {
  children: React.ReactNode;
};
export const Page: React.FC<PageProps> = ({ children }) => {
  const { currentIndex, history } = useRouter();

  const highlighted = history.map((path, index) =>
    index === currentIndex ? (
      <span style={{ color: "hotpink" }}>'{path}'</span>
    ) : (
      <span>'{path}'</span>
    ),
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <div>
        <h1>current history Index: {currentIndex}</h1>
        <h2>
          history stack : [
          {highlighted.map((h, i) => {
            if (i === highlighted.length - 1) return <>{h}</>;
            return <>{h}, </>;
          })}
          ]
        </h2>
      </div>
      {children}
    </div>
  );
};
