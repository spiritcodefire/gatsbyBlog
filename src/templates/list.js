import React from "react"
import { graphql, Link } from "gatsby"

import Layout from '../components/layout'
import Seo from '../components/seo'

const IndexPage = (props) => {
    const { nodes } = props.data.allMarkdownRemark
    return(
        <Layout>
            <Seo title="Blog Home" />
            <h1>List posts</h1>
            {nodes.map((e) => (
                <div>
                    <h2>{e.frontmatter.title}</h2>
                    <p>{e.excerpt}</p>
                    <Link to={e.fields.slug}>{e.frontmatter.title}</Link>
                </div>  
            ))}
        </Layout>
    ) 
}

export const query = graphql`
    query getPosts{
        allMarkdownRemark(
            sort: { fields: frontmatter___date, order: ASC}
        ){
            nodes {
                frontmatter {
                    title
                    date(formatString: "DD MM YYYY")
                }
                excerpt
                fields {
                    slug
                }
            }
        }
    }
`

export default IndexPage