/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  // Ensures we are processing only markdown files
  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({node,getNode, basePath: `content`,
    })

    // Creates new query'able field with name of 'slug'
    createNodeField({
      node,
      name: "slug",
      value: `/blog${slug}`,
    })
  }
}

exports.createPages = async function ({ actions, graphql }) {
    const {data} = await graphql(
      `
        query {
            allMarkdownRemark {
                edges {
                    node {
                        fields {
                        slug
                        }
                    }
                }
            }     
        }
      `)
      data.allMarkdownRemark.edges.forEach(edge => {
          const {slug}  = edge.node.fields
          actions.createPage({
              path: slug,
              component: require.resolve(`./src/templates/posts.js`),
              context: {slug: slug} ,
          })
      })
    
      actions.createPage({
          path: '/blog',
          component: require.resolve(`./src/templates/list.js`),
          context: {}
      })


}