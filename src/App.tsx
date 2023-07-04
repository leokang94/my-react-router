import "./App.css";
import { Route, Router } from "./lib/Router";
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
