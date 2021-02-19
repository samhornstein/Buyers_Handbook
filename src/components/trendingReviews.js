import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import PreviewCompatibleImage from "./PreviewCompatibleImage";

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
              <div class="container">
                <Link to={post.node.fields.slug} type="url">
                  <div className="crop_trending">
                    <PreviewCompatibleImage
                      imageInfo={{
                        image: post.node.frontmatter.image,
                        alt: `featured image thumbnail for post ${post.node.frontmatter.title}`,
                        size: "300px",
                      }}
                    />
                  </div>
                  <h3
                    style={{ color: "white", textShadow: " 1px 1px 0 #000" }}
                    class="bottom-left"
                  >
                    {post.node.frontmatter.title}
                  </h3>
                </Link>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};

export default TrendingReviews;
