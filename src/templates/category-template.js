import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ImageCard from "../components/ImageCard";

const CategoryTemplate = ({ data, location }) => {
  const nodes = data.allMarkdownRemark.nodes;
  const siteTitle = data.site.siteMetadata?.title || `Title`;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Reviews" />
      <h1>{nodes[0].frontmatter.category}</h1>
      {nodes.map((post) => {
        return (
          <div className="image-grid">
            {post.frontmatter.image ? (
              <ImageCard
                image={post.frontmatter.image}
                title={post.frontmatter.title}
                slug={post.fields.slug}
                size="290px"
                containerStyle="crop_trending"
              />
            ) : null}
          </div>
        );
      })}
    </Layout>
  );
};

export default CategoryTemplate;

export const pageQuery = graphql`
  query($id: String!) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { type: { eq: "Review" }, category: { eq: $id } } }
    ) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          category
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
  }
`;
