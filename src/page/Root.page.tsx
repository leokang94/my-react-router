import { Layout } from "../components/Layout";
import { useRouter } from "../lib/Router";

const RootPage = () => {
  const { push, replace } = useRouter();

  const moveToAbout = () => {
    push("/about");
  };
  const replaceToAbout = () => {
    replace("/about");
  };

  return (
    <Layout>
      <div>Root page</div>
      <div style={{ display: "flex", gap: "10px" }}>
        <button type="button" onClick={moveToAbout}>
          Go to about page
        </button>
        <button type="button" onClick={replaceToAbout}>
          replace to about page
        </button>
      </div>
    </Layout>
  );
};

export default RootPage;
