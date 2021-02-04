import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import PreviewCompatibleImage from './PreviewCompatibleImage'

const FeaturedReview = () => {
  const data = useStaticQuery(graphql`
  query FeaturedReviewQuery {
    allMarkdownRemark(filter: {frontmatter: {special_status: {eq: "Featured"}}}) {
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
    <div className="FeaturedReview">
      {/* {post.node.frontmatter.image ? (
                      <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: post.node.frontmatter.image,
                          alt: `featured image thumbnail for post ${post.node.frontmatter.title}`,
                        }}
                      />
                    </div>
      ) : null}
          <h3>
            Featured Review
            </h3>
            <Link to={post.node.fields.slug} type="url">
      {titulo}
      </Link> */}
                <h3>
            Featured Review
            </h3>
      <div class='container'>
      <Link to={post.node.fields.slug} type="url">
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
        <h2 style={{ color: 'white' }}class='bottom-left'>
        
          
            {titulo}
         
        </h2>
        </Link>
      </div>
    </div>
  )
}

export default FeaturedReview