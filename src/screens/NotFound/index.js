import React from "react";
import cn from "classnames";
import styles from "./NotFound.module.sass";

const bgImg = {
  backgroundImage: 'url(/images/404-bg.jpg)',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}

const notFound = () => {
  return (
    <div style={bgImg} className={cn("section", styles.section)}>
      <div className={cn("container", styles.notFound)}>
        <h1>404</h1>
        <h2>Page not fount</h2>
        <p>Page that you are looking for does not exist or error occured.<br /> Go back to choose new direction</p>
        <a href='/' className={cn("button", styles.goBack)}>Go back</a>
      </div>
    </div>
  );
};

export default notFound;