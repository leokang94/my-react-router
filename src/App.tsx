import "./App.css";
import { Page } from "./components/Page";
import { Route, Router } from "./lib/Router";
import { Suspense, lazy } from "react";

const RootPage = lazy(() => import("./page/Root.page"));
const AboutPage = lazy(() => import("./page/About.page"));

function App() {
  return (
    <Suspense>
      <Router>
        <Page>
          <Route path="/" component={<RootPage />} />
          <Route path="/about" component={<AboutPage />} />
        </Page>
      </Router>
    </Suspense>
  );
}

export default App;
