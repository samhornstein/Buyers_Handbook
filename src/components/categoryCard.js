import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import PreviewCompatibleImage from './PreviewCompatibleImage'

const FeaturedReview = () => {
  const data = useStaticQuery(graphql`
  query CategoryCardQuery {
    allMarkdownRemark {
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
  const post = data.allMarkdownRemark.edges[0]
  const titulo = post.node.frontmatter.title

  return (
    <div className="TrendingReview">
                <h3>
            Featured Review
            </h3>
      <div class='container'>
      <Link to={post.node.fields.slug} type="url">
      {post.node.frontmatter.image ? (
                      <div className="featured-thumbnail">
                        <div className="crop_trending">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.node.frontmatter.image,
                          alt: `featured image thumbnail for post ${post.node.frontmatter.title}`,
                        }}
                      />
                      </div>
                    </div>
      ) : null}
        <h2 style={{ color: 'white', textShadow: ' 1px 1px 0 #000' }} class='bottom-left'>
        
          
            {titulo}
         
        </h2>
        </Link>
      </div>
    </div>
  )
}

export default FeaturedReview