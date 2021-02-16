const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define templates
  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  const reviewArticle = path.resolve(`./src/templates/review-article.js`)
  const categoryTemplate = path.resolve(`./src/templates/category-template.js`)

  // Get all markdown blog posts sorted by date
  const result = await graphql(
    `
    {
      allMarkdownRemark(sort: {fields: [frontmatter___date], order: ASC}, limit: 1000) {
        group(field: frontmatter___type) {
          edges {
            node {
              id
              frontmatter {
                type
                title
                category
                description
                date
              }
              fields {
                slug
              }
            }
          }
        }
        distinct(field: frontmatter___category)
      }
    }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allMarkdownRemark.group[0].edges
  const reviews = result.data.allMarkdownRemark.group[1].edges
  const categories = result.data.allMarkdownRemark.distinct

  if (posts.length > 0) {
    posts.forEach((post) => {

      createPage({
        path: post.node.fields.slug,
        component: blogPost,
        context: {
          id: post.node.id,
        },
      })
    })
  }

  if (reviews.length > 0) {
    reviews.forEach((post) => {

      createPage({
        path: post.node.fields.slug,
        component: reviewArticle,
        context: {
          id: post.node.id,
        },
      })
    })
  }

  if (categories.length > 0) {
    categories.forEach((category) => {

      createPage({
        path: "categories/"+category,
        component: categoryTemplate,
        context: {
          id: category,
        },
      })
    })
  }

}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
