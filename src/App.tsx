import "./App.css";
import Route from "./lib/Router/Route";
import Router from "./lib/Router/Router";
import { Suspense, lazy } from "react";

const RootPage = lazy(() => import("./page/Root.page"));
const AboutPage = lazy(() => import("./page/About.page"));

function App() {
  return (
    <Suspense>
      <Router>
        <Route path="/" component={<RootPage />} />
        <Route path="/about" component={<AboutPage />} />
      </Router>
    </Suspense>
  );
}

export default App;
