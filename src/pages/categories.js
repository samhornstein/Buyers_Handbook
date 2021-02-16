import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const ReviewArticleIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const categories = data.allMarkdownRemark.distinct


  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Categories " />
      <h1>Categories</h1>
        {categories.map(category => {
          return (
                <div className='category'>
                  <h2>
                    <Link to={category} type="url">
                      <span itemProp="headline">{category}</span>
                      </Link>
                  </h2>
                </div>
          )
        })}
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
    allMarkdownRemark(filter: {frontmatter: {type: {eq: "Review"}}}) {
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
