import React from 'react'
import { graphql } from "gatsby"
import Layout from "../components/layout"

const CategoryTemplate = ({ data, location }) => {
  const nodes = data.allMarkdownRemark.nodes
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout title={siteTitle} location={location}>
      <h3>{nodes[0].frontmatter.category}</h3>
      {nodes.map(node => {
        return(<p>{node.frontmatter.title}</p>)
      })}
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
        }
      }
    }
  }
`
