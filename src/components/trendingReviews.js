import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import PreviewCompatibleImage from './PreviewCompatibleImage'

const TrendingReviews = () => {
  const data = useStaticQuery(graphql`
  query TrendingReviewsQuery {
    allMarkdownRemark(filter: {frontmatter: {special_status: {eq: "Trending"}}}) {
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
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const posts = data.allMarkdownRemark.edges

  return (

    <div className="TrendingReviews">
          <h3>Trending Reviews</h3>
          {posts.map(post => {
            const titulo = post.node.frontmatter.title
            return(
              <li key={post.node.fields.slug}>
                      {post.node.frontmatter.image ? (
                      <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.node.frontmatter.image,
                          alt: `featured image thumbnail for post ${post.node.frontmatter.title}`,
                        }}
                      />
                    </div>
      ) : null}
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