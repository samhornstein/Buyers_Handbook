import React from "react";
import { useStaticQuery, graphql } from "gatsby";
import ImageCard from "./ImageCard";

const HomepageBlurb = () => {
  const data = useStaticQuery(graphql`
    query HomepageBlurb {
      allFile(filter: {absolutePath: {eq: "/Users/samhornstein/gatsby-starter-blog-2/content/assets/homepage-image.jpg"}}) {
        edges {
          node {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  `);

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const file = data.allFile.edges[0].node;

  return (
    <div className="FeaturedReview">
      <h3>Who We Are</h3>
      <div className="image-grid">
        <ImageCard
          image={file}
          title='Welcome to the home of the most trusted data-driven reviews on the internet. Click to find out more.'
          slug='/about'
          size="600px"
          containerStyle="crop_blurb"
        />
      </div>
    </div>
  );
};

export default HomepageBlurb;
