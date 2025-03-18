import { MDXProvider } from '@mdx-js/react';
import { Link } from 'react-router';
import {type BlogPost} from "./utils.tsx";

const CustomLink = ({ href, children }) => {
  if (href.startsWith('/')) {
    return <Link
      to={href}
    >{children}</Link>;
  }
  return <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>;
};




export const components = {
  a: CustomLink,
  // You can add other custom components here
}

// TODO I can't get this working, just using `components` directly where MDX is rendered for now
export function MyMDXProvider({children}) {
  return <MDXProvider components={components}>
    {children}
  </MDXProvider>
}

export function renderBlogPost(p: BlogPost) {
  if (p.jsx) {
    return p.default()
  }
  return <p.default components={components} />
}