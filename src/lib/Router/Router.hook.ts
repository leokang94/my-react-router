export const useRouter = () => {
  const push = (path: string) => {
    console.warn(`Not implemented 'push' method, but targetpath is '${path}'`);
  };

  return { push } as const;
};
