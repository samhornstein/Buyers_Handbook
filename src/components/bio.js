import React from "react"
// import { useStaticQuery, graphql } from "gatsby"
// import Image from "gatsby-image"

const Bio = ({articleAuthor}) => {
  // const data = useStaticQuery(graphql`
  //   query BioQuery {
  //     avatar: file(absolutePath: { regex: "/linkedin_profile.jpeg/" }) {
  //       childImageSharp {
  //         fixed(width: 50, height: 50, quality: 95) {
  //           ...GatsbyImageSharpFixed
  //         }
  //       }
  //     }
  //   }
  // `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = articleAuthor

  // const avatar = data?.avatar?.childImageSharp?.fixed

  return (
    <div className="bio">
      {/* {avatar && (
        <Image
          fixed={avatar}
          alt={author?.name || ``}
          className="bio-avatar"
          imgStyle={{
            borderRadius: `50%`,
          }}
        />
      )} */}
      {author && (
        <p>
          Written by <strong>{articleAuthor}</strong> {author?.summary || null}
          {` `}
        </p>
      )}
    </div>
  )
}

export default Bio
