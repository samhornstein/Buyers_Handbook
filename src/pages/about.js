import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

const About = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="About" />
      <h1>About</h1>
      <h3>Mission</h3>
      <p>
        At The Buyer's Handbook, we aggregate review metrics from the largest
        e-commerce sites in the world. We give the modern consumer the
        information they need to make data-driven decisions on the products they
        purchase. Simply put, we believe that numbers don't lie.
      </p>
      <h3>How We Do It</h3>
      <p>
        We use advanced statistical methods to answer the simple question: which
        product should I buy? From machine learning to sentiment analysis, we
        analyze data from consumers just like you to objectively determined
        which products are worthy of your hard-earned money.
      </p>
      <h3>Shop With Confidence</h3>
      <p>
        In the 21st century, online shopping can be a daunting task. With so
        many products and so much information, it can be hard to sift through
        the junk. So let our reviews help.
      </p>
    </Layout>
  );
};

export default About;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
