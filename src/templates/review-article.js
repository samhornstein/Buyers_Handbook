import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

const ReviewArticleTemplate = ({ data, location }) => {
  const article = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={article.frontmatter.title}
        description={article.frontmatter.description || article.excerpt}
      />
      <article
        className="blog-article"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h2 style={{ display: 'inline-block', marginTop: '0' }} >{article.frontmatter.title}</h2>
          <div style={{ display: 'inline-block', float: 'right' }} >
            Last updated {article.frontmatter.date}
          </div>
        </header>
        <br />
        <section
          dangerouslySetInnerHTML={{ __html: article.html }}
          itemProp="articleBody"
        />
        <hr />
        <footer>
        </footer>
      </article>
    </Layout>
  )
}

export default ReviewArticleTemplate

export const pageQuery = graphql`
  query ReviewArticleBySlug(
    $id: String!
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        author
        date
        description
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
`
