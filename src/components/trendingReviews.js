import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const TrendingReviews = () => {
  const data = useStaticQuery(graphql`
  query TrendingReviewsQuery {
    allMarkdownRemark(filter: {frontmatter: {special_status: {eq: "Trending"}}}) {
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
  const posts = data.allMarkdownRemark.edges
  // const titulo = posts.node.frontmatter.title
  return (

    <div className="TrendingReviews">
          <h3>Trending Reviews</h3>
          {posts.map(post => {
            const titulo = post.node.frontmatter.title
            return(
              <li key={post.node.fields.slug}>
                <Link to={post.node.fields.slug} type="url">
                {titulo}
                </Link>
                </li>
                
                
            )
          })}
    </div>
  )
}

export default TrendingReviews