import React from 'react'
import { Link, graphql } from "gatsby"
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
        {nodes.map(node => {
          const title = node.frontmatter.title || node.fields.slug

          return (
            <li key={node.fields.slug}>
              <article
                className="node-list-item"
                itemScope
                itemType="http://schema.org/Article"
              >
                <header>
                  <h2>
                    <Link to={node.fields.slug} itemProp="url">
                      <span itemProp="headline">{title}</span>
                    </Link>
                  </h2>
                  <small>{node.frontmatter.date}</small>
                </header>
                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.frontmatter.description || node.excerpt,
                    }}
                    itemProp="description"
                  />
                </section>
              </article>
            </li>
          )
        })}
      </ol>
    </Layout>
  )

  // return (
  //   <Layout title={siteTitle} location={location}>
  //     <h3>{nodes[0].frontmatter.category}</h3>
  //     {nodes.map(node => {
  //       return(<p>{node.frontmatter.title}</p>)
  //     })}
  //   </Layout>
  // )
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
