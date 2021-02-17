import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import PreviewCompatibleImage from "../components/PreviewCompatibleImage"
import SEO from "../components/seo"

const ReviewArticleIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const categories = data.allMarkdownRemark.distinct
  const reviews = data.allMarkdownRemark.nodes

  var uniqueCategoryImages = []

  for (var i=0; i<categories.length; i++) {
    for (var j=0; j<reviews.length; j++) {
      if (categories[i] === reviews[j].frontmatter.category) {
        uniqueCategoryImages.push(reviews[j])
        break
      }
    }
  }


  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Categories " />
      <h1>Categories</h1>
      <div>
            <div>
              {uniqueCategoryImages.map(entry=> {
                    return (

            <div style={{ display: 'inline-grid', margin:'10px' }}>
                {entry.frontmatter.image ? (
                  <p>
                    <div class='container'  >
                    <Link to={entry.frontmatter.category} type="url">
                        <div className="featured-thumbnail">
                          <div className="crop_trending">
                        <PreviewCompatibleImage
                          imageInfo={{
                            image: entry.frontmatter.image,
                            alt: `featured image thumbnail for post ${entry.frontmatter.title}`,
                            size: '300px',
                          }}
                        />
                        </div>
                      </div>
                      <h3 style={{ color: 'white', textShadow: ' 1px 1px 0 #000' }} class='bottom-left'>
                  {entry.frontmatter.category}
                  </h3>
                  </Link>
                  </div>
                </p>
              ) : null
            }     
          </div>





                  // <h2>
                  //   <Link to={entry.frontmatter.category} type="url">
                  //     <div itemProp="headline">{entry.frontmatter.category}</div>
                  //     </Link>
                  // </h2>
              )
              })}
            </div>
          </div>
    </Layout>
  )
}

export default ReviewArticleIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(filter: {frontmatter: {type: {eq: "Review"}}}, sort: {fields: frontmatter___title, order: DESC}) {
      nodes {
        fields {
          slug
        }
        frontmatter {
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
      distinct(field: frontmatter___category)
    }
  }
`
