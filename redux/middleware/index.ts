const logger = (store: any) => (next: any) => (action: any) => {
  const blacklist = [
    "persist/REHYDRATE",
    "persist/PERSIST",
    "common/setLoading",
    "common/setNotifi",
  ];
  let result = next(action);
  if (!blacklist.includes(action.type)) {
    console.log("dispatching", action.type);
    console.log("next state", store.getState());
  }
  return result;
};

export { logger };
