import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

const Contact = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Contact" />
      <div className='centered'>
      <h1>Contact</h1>
      <p>We would love to hear from you!</p>
      <form name="contact" method="POST" data-netlify="true">
          <label>
            Name <input type="text" name="name" />
          </label>
          <label>
            Email <br />
            <input type="email" name="email" />
          </label>
          <label>
            Subject <input type="text" name="subject" />
          </label>
          <label>
            Message <textarea name="message" rows="5"></textarea>
          </label>
          <button type="submit">Send</button>
      </form>
      </div>
    </Layout>
  );
};

export default Contact;

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }

  }
`;