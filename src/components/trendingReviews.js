import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";
import ImageCard from "./ImageCard";

const TrendingReviews = () => {
  const data = useStaticQuery(graphql`
    query TrendingReviewsQuery {
      allMarkdownRemark(
        filter: { frontmatter: { special_status: { eq: "Trending" } } }
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
  const posts = data.allMarkdownRemark.edges;

  return (
    <div className="TrendingReviews">
      <h3>Trending Reviews</h3>
      {posts.map((post) => {
        return (
          <div className="image-grid">
            {post.node.frontmatter.image ? (
              <ImageCard
                image={post.node.frontmatter.image}
                title={post.node.frontmatter.title}
                slug={post.node.fields.slug}
                size="290px"
                containerStyle="crop_trending"
              />
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default TrendingReviews;
