import React from "react";
import { Link } from "gatsby";
import Img from "gatsby-image";

const ImageCard = ({ image, title, slug, size, containerStyle }) => {
  const imageStyle = {
    borderRadius: "5px",
    objectFit: "contain",
    height: "100%",
    width: size,
  };

  return (
    <div class="container">
      <Link to={slug} type="url">
        {image ? (
          <div className="featured-thumbnail">
            <div className={containerStyle}>
              <Img
                style={imageStyle}
                fluid={image.childImageSharp.fluid}
                alt={`This is an image of ${title}`}
              />
            </div>
          </div>
        ) : null}
        <h2
          style={{ color: "white", textShadow: " 1px 1px 0 #000" }}
          class="bottom-left"
        >
          {title}
        </h2>
      </Link>
    </div>
  );
};

export default ImageCard;
