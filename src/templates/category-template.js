import React from 'react'
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ReviewRoll from '../components/ReviewRoll'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import imageSource from '/content/reviews/camera/salty_egg.jpg'
import Img from 'gatsby-image'

const CategoryTemplate = ({ data, location }) => {
  const nodes = data.allMarkdownRemark.nodes
  const siteTitle = data.site.siteMetadata?.title || `Title`

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="Reviews" />
      <h1>{nodes[0].frontmatter.category}</h1>
      <ol style={{ listStyle: `none` }}>
        {nodes.map(post => {
          // const title = node.frontmatter.title || node.fields.slug
          

          return(
            <header>
            {post.frontmatter.image ? (
              <div className="featured-thumbnail">
                <PreviewCompatibleImage
                  imageInfo={{
                    image: post.frontmatter.image,
                    alt: `featured image thumbnail for post ${post.frontmatter.title}`,
                  }}
                />
              </div>
            ) : null}
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


            
          //   <div>
          //     {node.frontmatter.image ? (
          //   <div className="featured-thumbnail">

          //   <PreviewCompatibleImage
          //   imageInfo={{
          //     image: node.frontmatter.image,
          //     alt: `featured image thumbnail for post ${node.frontmatter.title}`,
          //   }}
          // />
          // </div>
          //     ): null}

          //     <p>{node.frontmatter.title}</p>
          //     <p>{node.frontmatter.image}</p>
          // </div>


          // <div>
          //   <Img fluid={node.frontmatter.image.childImageSharp.fluid} />
          //   {/* <img src={imageSource} /> */}
          // </div>

            // <ReviewRoll title={node.frontmatter.title} slug={node.fields.slug} description={node.frontmatter.description} id={node.id} image={node.frontmatter.image}/>
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
