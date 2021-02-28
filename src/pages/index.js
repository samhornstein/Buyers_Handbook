import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";
import FeaturedReview from "../components/featuredReview";
import TrendingReview from "../components/trendingReviews";
import HomepageBlurb from "../components/HomepageBlurb"

const Homepage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`;
  
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Homepage" />
      <div className='image-grid'>              
        <HomepageBlurb />
      </div>
      <div className='image-grid'>
        <FeaturedReview />
      </div>
      <TrendingReview />
    </Layout>
  );
};

export default Homepage;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allFile(filter: {absolutePath: {eq: "/Users/samhornstein/gatsby-starter-blog-2/content/assets/homepage-image.jpg"}}) {
      edges {
        node {
          childImageSharp {
            fluid {
              base64
            }
          }
        }
      }
    }
  }
`;
