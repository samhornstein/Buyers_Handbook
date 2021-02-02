import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const FeaturedReview = () => {
  const data = useStaticQuery(graphql`
  query FeaturedReviewQuery {
    allMarkdownRemark(filter: {frontmatter: {special_status: {eq: "Featured"}}}) {
      edges {
        node {
          frontmatter {
            title
          }
          fields {
            slug
          }
        }
      }
    }
  }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const post = data.allMarkdownRemark.edges[0]
  const titulo = post.node.frontmatter.title
  return (

    <div className="FeaturedReview">
          <h3>
            Featured Review
            </h3>
            <Link to={post.node.fields.slug} type="url">
      {titulo}
      </Link>
    </div>
  )
}

export default FeaturedReview