const usePost = (url: string) => {
  const post = (body: unknown) =>
    window.localStorage.setItem(url, JSON.stringify(body));

  return { post };
};

export default usePost;
