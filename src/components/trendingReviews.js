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

              <div>

                      {post.node.frontmatter.image ? (
                        // <li key={post.node.fields.slug}>
                        <p>
                  <div class='container'>
                  <Link to={post.node.fields.slug} type="url">
                      <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.node.frontmatter.image,
                          alt: `featured image thumbnail for post ${post.node.frontmatter.title}`,
                        }}
                      />
                    </div>
                    <h3 style={{ color: 'white' }} class='bottom-left'>
                {titulo}
                </h3>
                </Link>
                </div>
                </p>
                //</li>
      ) : null
      
      }

               
      </div>
                
            )
          })}
    </div>
  )
}

export default TrendingReviews