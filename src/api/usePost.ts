interface IUsePost {
  url: string;
  body: unknown;
}

const usePost = ({ url, body }: IUsePost) => {
  window.localStorage.setItem(url, JSON.stringify(body));
};

export default usePost;
