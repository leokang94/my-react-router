import { Layout } from "../components/Layout";
import { useRouter } from "../lib/Router";

const RootPage = () => {
  const { push } = useRouter();

  const moveToAbout = () => {
    push("/about");
  };

  return (
    <Layout>
      <div>Root page</div>
      <button type="button" onClick={moveToAbout}>
        Go to about page
      </button>
    </Layout>
  );
};

export default RootPage;
