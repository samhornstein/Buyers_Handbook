import React from 'react'
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import PreviewCompatibleImage from "../components/PreviewCompatibleImage"
import SEO from "../components/seo"

const CategoryTemplate = ({ data, location }) => {
  const nodes = data.allMarkdownRemark.nodes
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Reviews" />
      <h1>{nodes[0].frontmatter.category}</h1>
      <ol style={{ listStyle: `none` }}>
        {nodes.map(post => {

          return(
            <div style={{ display: 'inline-grid', margin:'10px' }}>
                {post.frontmatter.image ? (
                  <p>
                    <div class='container'  >
                    <Link to={post.fields.slug} type="url">
                        <div className="featured-thumbnail">
                          <div className="crop_trending">
                        <PreviewCompatibleImage
                          imageInfo={{
                            image: post.frontmatter.image,
                            alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                            size: '300px',
                          }}
                        />
                        </div>
                      </div>
                      <h3 style={{ color: 'white', textShadow: ' 1px 1px 0 #000' }} class='bottom-left'>
                  {post.frontmatter.title}
                  </h3>
                  </Link>
                  </div>
                </p>
              ) : null
            }     
          </div>
        )
        })}
      </ol>
    </Layout>
  )

}

export default CategoryTemplate

export const pageQuery = graphql`
  query(
    $id: String!
  ) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}, filter: {frontmatter: {type: {eq: "Review"}, category: {eq: $id}}}) {
      nodes {
        excerpt
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
          category
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
