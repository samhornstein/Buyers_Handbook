import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const StaticImage = () => {
  const data = useStaticQuery(graphql`
  query {
    file(relativePath: {eq: "camera/salty_egg.jpg"}) {
      childImageSharp {
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
  `)

return(
  <div>
    {/* <h1>Hello gatsby-image</h1> */}
    <Img fixed={data.file.childImageSharp.fixed} />
  </div>
)
}

export default StaticImage