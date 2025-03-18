const blogModules_ = import.meta.glob('/app/content/blog/**/index.(mdx|tsx)');
const blogModules = Object.values(blogModules_)
console.log(blogModules[0].default)

// export async function loader({ params }) {
//   // const { id } = params;
//   // const moduleLoader = blogModules[`./blog/${id}.jsx`];
//   // if (!moduleLoader) {
//   //   throw new Response("Not Found", { status: 404 });
//   // }
//   console.log({blogModules})
//   const bm = Object.values(blogModules)
//   const moduleLoader = bm[0].default;
//   console.log(bm[0])
//   const module = await moduleLoader();
//   return { module };
// }

// export default function MyComponent({ loaderData }) {
//   debugger
//   const BlogComponent = loaderData.module;
//   return <BlogComponent />;
// }

export default function Sitemap({loaderData}) {
  // const content = await import(() => blogModules[0])
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://www.mysite.com/</loc>
        <lastmod>2022-08-27</lastmod>
      </url>
      <url>
        <loc>https://www.mysite.com/blogs/</loc>
        <lastmod>2022-08-27</lastmod>
      </url>
    </urlset>
  </>`
}