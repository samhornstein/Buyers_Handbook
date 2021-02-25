import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import ImageCard from "../components/ImageCard";

const Categories = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  const categories = data.allMarkdownRemark.distinct;
  const reviews = data.allMarkdownRemark.nodes;
  var uniqueCategoryImages = [];

  for (var i = 0; i < categories.length; i++) {
    for (var j = 0; j < reviews.length; j++) {
      if (categories[i] === reviews[j].frontmatter.category) {
        uniqueCategoryImages.push(reviews[j]);
        break;
      }
    }
  }

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Categories " />
      <h1>Categories</h1>
      {uniqueCategoryImages.map((entry) => {
        return (
          <div className="image-grid">
            {entry.frontmatter.image ? (
              <ImageCard
                image={entry.frontmatter.image}
                title={entry.frontmatter.category}
                slug={entry.frontmatter.category}
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

export default Categories;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "Review" } } }
      sort: { fields: frontmatter___title, order: DESC }
    ) {
      nodes {
        fields {
          slug
        }
        frontmatter {
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
      distinct(field: frontmatter___category)
    }
  }
`;
