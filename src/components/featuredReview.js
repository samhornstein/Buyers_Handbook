import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import ImageCard from "./ImageCard";

const FeaturedReview = () => {
  const data = useStaticQuery(graphql`
    query FeaturedReviewQuery {
      allMarkdownRemark(
        filter: { frontmatter: { special_status: { eq: "Featured" } } }
      ) {
        edges {
          node {
            frontmatter {
              title
              image {
                childImageSharp {
                  fluid {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const post = data.allMarkdownRemark.edges[0];

  return (
    <div className="FeaturedReview">
      <h3>Featured Review</h3>
      <div className="image-grid">
        <ImageCard
          image={post.node.frontmatter.image}
          title={post.node.frontmatter.title}
          slug={post.node.fields.slug}
          size="600px"
          containerStyle="crop_featured"
        />
      </div>
    </div>
  );
};

export default FeaturedReview;
