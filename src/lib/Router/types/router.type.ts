type RouterContextValue = {
  currentIndex: number;
  history: string[];
  routerMap: Map<string, React.ReactNode>;
};

export type RouterContextDispatcher = {
  pushToMap: (path: string, component: React.ReactNode) => void;
  push: (path: string, state?: Record<string, unknown>) => void;
  replace: (path: string, state?: Record<string, unknown>) => void;
};

export type RouterContext = RouterContextValue & RouterContextDispatcher;
