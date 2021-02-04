import React from 'react'
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
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
            <header>

            <p className="post-meta">
              <Link
                className="title has-text-primary is-size-4"
                to={post.fields.slug}
              >
                {post.frontmatter.title}
              </Link>
              <span> &bull; </span>
              <span className="subtitle is-size-5 is-block">
                {post.frontmatter.date}
              </span>
            </p>
          </header>
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
