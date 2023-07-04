import { Layout } from "../components/Layout";
import { useRouter } from "../lib/Router";

const AboutPage = () => {
  const { push } = useRouter();

  const moveToRoot = () => {
    push("/");
  };

  return (
    <Layout>
      <div>About page</div>
      <button type="button" onClick={moveToRoot}>
        Go to root page
      </button>
    </Layout>
  );
};

export default AboutPage;
