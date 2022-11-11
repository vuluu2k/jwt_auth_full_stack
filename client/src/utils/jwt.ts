const JWTManager = () => {
  let InMemoryToken: string | null = null;

  const getToken = () => InMemoryToken;

  const setToken = (accessToken: string) => {
    InMemoryToken = accessToken;
  };

  return { getToken, setToken };
};

export default JWTManager();
