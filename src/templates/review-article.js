import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

const ReviewArticleTemplate = ({ data, location }) => {
  const article = data.markdownRemark;
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={article.frontmatter.title}
        description={article.frontmatter.description || article.excerpt}
      />
      
      <article
        className="blog-article"
        itemScope
        itemType="http://schema.org/Article"
      >
        <div className='centered'>
        <header>
          <h2>{article.frontmatter.title}</h2>
          <hr />
          <div>Last updated {article.frontmatter.date}</div>
        </header>
        <br/>
        <section
          dangerouslySetInnerHTML={{ __html: article.html }}
          itemProp="articleBody"
        />
              </div>
      </article>

    </Layout>
  );
};

export default ReviewArticleTemplate;

export const pageQuery = graphql`
  query ReviewArticleBySlug($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date
        image {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
