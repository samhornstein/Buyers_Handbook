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
      <ol style={{ listStyle: `none` }}>
        {categories.map(category => {
          return (
            <li key={category}>
              <article
                className="category-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={category} type="url">
                      <span itemProp="headline">{category}</span>
                      </Link>
                  </h2>
                </header>
              </article>
            </li>
          )
        })}
      </ol>
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
