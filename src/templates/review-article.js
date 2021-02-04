import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Bio from '../components/bio'

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
          <h2 >{article.frontmatter.title}</h2>
          <Bio articleAuthor='Sam Hornstein'/>
          <p>Last updated on {article.frontmatter.date}</p>
          {article.frontmatter.image ? (
              <div className="featured-thumbnail">
                <PreviewCompatibleImage
                  imageInfo={{
                    image: article.frontmatter.image,
                    alt: `featured image thumbnail for article ${article.frontmatter.title}`,
                  }}
                />
              </div>
            ) : null}
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
        date(formatString: "MMMM DD, YYYY")
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
