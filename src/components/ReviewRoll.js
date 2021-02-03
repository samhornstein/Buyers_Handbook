import React from 'react'
import { Link } from 'gatsby'
import PreviewCompatibleImage from './StaticImage'


const ReviewRoll = ({title, description, slug, id, image}) => {
    return (
        <div className="columns is-multiline">
            <div className="is-parent column is-6" key={id}>
              <article
                // className={`blog-list-item tile is-child box notification ${
                //   post.frontmatter.featuredpost ? 'is-featured' : ''
                // }`}
              >
                <header>
                  {/* {image ? (
                    <div className="featured-thumbnail">
                      <PreviewCompatibleImage
                        imageInfo={{
                          image: {image},
                          alt: `featured image thumbnail for post ${title}}`,
                        }}
                      />
                    </div>
                //   ) : null} */}
                 {/* <Img  fluid={image.childImageSharp.fluid}  /> */}
                 <PreviewCompatibleImage />
                  <p className="post-meta">
                    <Link
                      className="title has-text-primary is-size-4"
                      to={slug}
                    >
                      {title}
                    </Link>
                    <span> &bull; </span>
                  </p>
                </header>
                <p>
                  {description}
                  <br />
                  <br />
                  <Link className="button" to={slug}>
                    Keep Reading →
                  </Link>
                </p>
              </article>
            </div>            
        </div>
    )
}

export default ReviewRoll