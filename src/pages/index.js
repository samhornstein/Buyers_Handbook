import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import FeaturedReview from "../components/featuredReview"
import TrendingReview from "../components/trendingReviews"


const Homepage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`


  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Homepage" />
      <p>Some words on the homepage.</p>
      <FeaturedReview />
      <TrendingReview />
    </Layout>
  )
}

export default Homepage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
