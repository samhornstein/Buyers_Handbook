import React from "react";
import { Link } from "gatsby";

const ListLink = (props) => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
);

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`;
  const isRootPath = location.pathname === rootPath;
  let header;

  header = (
    <div>
      <header>
        <Link to="/">
          <h1 style={{ display: `inline` }}>{title}</h1>
        </Link>
        <ul style={{ listStyle: `none`, float: `right` }}>
          <ListLink to="/categories">
            <h5 style={{ display: `inline` }}>Categories</h5>
          </ListLink>
          <ListLink to="/about/">
            <h5 style={{ display: `inline` }}>About</h5>
          </ListLink>
          <ListLink to="/contact/">
            <h5 style={{ display: `inline` }}>Contact</h5>
          </ListLink>
        </ul>
      </header>
    </div>
  );

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <div className="content-wrapper">
        <header className="global-header">{header}</header>
        <main>{children}</main>
      </div>
      <hr/>
      <footer>
        <p>© {new Date().getFullYear()}, The Buyer's Handbook</p>
      </footer>
    </div>
  );
};

export default Layout;
