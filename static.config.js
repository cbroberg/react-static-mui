import axios from "axios";

export default {
  getSiteData: () => ({
    title: "React Static"
  }),
  getRoutes: async () => {
    const { data: posts } = await axios.get(
      "https://betabackend.senti.cloud/rest/cms/pages/da/138230100010010"
    );
    return [
      {
        path: "/blog",
        getData: () => ({
          posts
        }),
        children: posts.map(post => ({
          path: `/post/${post.urlShort}/`,
          component: "src/containers/Post",
          getData: () => ({
            post
          })
        }))
      }
    ];
  }
};
