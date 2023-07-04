import { HistoryState } from "./types/historyState.type";
import { RouterContext, RouterContextDispatcher } from "./types/router.type";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

const initialRouterContext: RouterContext = {
  currentIndex: -1,
  history: [],
  routerMap: new Map(),
  pushToMap: () => {
    /* do nothing */
  },
  push: () => {
    /* do nothing */
  },
  replace: () => {
    /* do nothing */
  },
};

// const SESSION_STORAGE_INDEX_KEY = "my-react-router-currentIndex";
// const SESSION_STORAGE_HISTORY_KEY = "my-react-router-history";
const CHANGE_STATE = ["pushState", "replaceState"] as const;

const routerContext = createContext<RouterContext>(initialRouterContext);

export const useRouterContext = () => {
  return useContext(routerContext);
};

const getInitialIndex = () => {
  // return Number(sessionStorage.getItem(SESSION_STORAGE_INDEX_KEY)) ?? 0;
  return 0;
};

const getInitialHistory = () => {
  // const historyFromSessionHistory = sessionStorage.getItem(
  //   SESSION_STORAGE_HISTORY_KEY,
  // );
  // return historyFromSessionHistory
  //   ? JSON.parse(historyFromSessionHistory)
  //   : [window.location.pathname];

  return [window.location.pathname];
};

export const RouterProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentIndex, setCurrentIndex] = React.useState(getInitialIndex());
  const [history, setHistory] = React.useState<string[]>(getInitialHistory());
  const historyRef = useRef<string[]>(getInitialHistory());
  const [routerMap, setRouterMap] = React.useState<
    Map<string, React.ReactNode>
  >(new Map());

  const originChangeStateRef = useRef<{
    pushState: typeof window.history.pushState;
    replaceState: typeof window.history.replaceState;
  }>({
    pushState: window.history.pushState,
    replaceState: window.history.replaceState,
  });

  // const saveToSessionStorage = (index: number, history: string[]) => {
  //   sessionStorage.setItem(SESSION_STORAGE_INDEX_KEY, index.toString());
  //   sessionStorage.setItem(
  //     SESSION_STORAGE_HISTORY_KEY,
  //     JSON.stringify(history),
  //   );
  // };

  const setChangeProxy = useCallback(() => {
    CHANGE_STATE.forEach((changeState) => {
      window.history[changeState] = new Proxy(
        originChangeStateRef.current[changeState],
        {
          apply: (
            target,
            thisArg,
            [state, unused, path]: [
              Record<string, unknown>,
              string,
              string | URL | null | undefined,
            ],
          ) => {
            let customState: HistoryState = { ...state, currentIndex };
            let nextIndex = currentIndex;

            console.log("changeState", changeState);

            if (changeState === "pushState") {
              nextIndex += 1;
              customState = { ...customState, currentIndex: nextIndex };

              // history stack에 이미 nextIndex가 있다면 대체한다.
              if (historyRef.current[nextIndex]) {
                historyRef.current = [
                  ...historyRef.current.slice(0, nextIndex),
                  path as string,
                ];
                setHistory(historyRef.current);
              } else {
                historyRef.current = [...historyRef.current, path as string];
                setHistory(historyRef.current);
              }

              setCurrentIndex((prev) => prev + 1);
            } else {
              customState = { ...customState, currentIndex: nextIndex };

              historyRef.current[currentIndex] = path as string;
              setHistory((prev) => {
                const next = [...prev];
                next[currentIndex] = path as string;
                return next;
              });
            }
            // saveToSessionStorage(nextIndex, historyRef.current);

            return target.apply(thisArg, [customState, unused, path]);
          },
        },
      );
    });
  }, [currentIndex]);

  const pushToMap = useCallback<RouterContextDispatcher["pushToMap"]>(
    (path, component) => {
      setRouterMap((prev) => {
        const newMap = new Map(prev);
        newMap.set(path, component);
        return newMap;
      });
    },
    [],
  );

  const push = useCallback<RouterContextDispatcher["push"]>(
    (path: string, state) => {
      window.history.pushState(state, "", path);
    },
    [],
  );

  const replace = useCallback<RouterContextDispatcher["replace"]>(
    (path: string, state) => {
      window.history.replaceState(state, "", path);
    },
    [],
  );

  const handlePopState = useCallback((e: PopStateEvent) => {
    const nextIndex = (e.state as HistoryState).currentIndex;

    setCurrentIndex(nextIndex);
    // saveToSessionStorage(nextIndex, history);
  }, []);

  useEffect(() => {
    setChangeProxy();

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [setChangeProxy, handlePopState]);

  useEffect(() => {
    replace(window.location.pathname, { currentIndex: 0 });
  }, [replace]);

  return (
    <routerContext.Provider
      value={{ currentIndex, history, routerMap, pushToMap, push, replace }}
    >
      {children}
    </routerContext.Provider>
  );
};
