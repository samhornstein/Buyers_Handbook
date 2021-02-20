import React from "react";
import { graphql } from "gatsby";
import Layout from "../components/layout";
import SEO from "../components/seo";

const Contact = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title;

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Contact" />
      <h1>Contact</h1>
      <h4>We would love to hear from you!</h4>
      <p>Please use the contact form below:</p>
      <form name="contact" method="POST" data-netlify="true">
        <p>
          <label>
            Name <input type="text" name="name" />
          </label>
        </p>
        <p>
          <label>
            Email <br />
            <input type="email" name="email" />
          </label>
        </p>
        <p>
          <label>
            Subject <input type="text" name="subject" />
          </label>
        </p>
        <p>
          <label>
            Message <textarea name="message" rows="5"></textarea>
          </label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>
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
