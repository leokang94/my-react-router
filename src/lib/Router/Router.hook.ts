import { useRouterContext } from "./Router.context";

export const useRouter = () => {
  const { currentIndex, history, push, replace } = useRouterContext();
  return { currentIndex, history, push, replace } as const;
};
