import styles from "./YoutubeVideos.module.sass";
import ReactPlayer from 'react-player/lazy';
import ModalImage from "react-modal-image-responsive";
import React, { useState } from "react";

const YoutubeVideos = () => {
  const [galleryType, setGalleryType] = useState('video');
  const [link, setLink] = useState('');
  const [alt, setAlt] = useState('');
  const [transform, setTransform] = useState(0);
  const [thumb, setThumb] = useState("/images/Youtube/thumb-vid-1.jpg");
  const playButton = <svg width="42" height="40" viewBox="0 0 42 40" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="41.831" height="40" rx="20" fill="#0D5590"/>
  <path d="M28 20L16 26.9282L16 13.0718L28 20Z" fill="white"/>
  </svg>;
  const videos = [
    {
      thumb: "/images/Youtube/thumb-vid-1.jpg",
      link: "https://youtu.be/7PKtzBQYrXY",
      alt: "",
      type: "video"
    },
    {
      thumb: "/images/Youtube/thumb-vid-2.jpg",
      link: "",
      alt: "Test your fishing skills",
      type: "image"
    },
    {
      thumb: "/images/Youtube/thumb-vid-3.jpg",
      link: "",
      alt: "Compete with players around the world",
      type: "image"
    },
    {
      thumb: "/images/Youtube/thumb-vid-4.jpg",
      link: "",
      alt: "Compete with players around the world",
      type: "image"
    },
    {
      thumb: "/images/Youtube/thumb-vid-5.jpg",
      link: "",
      alt: "Compete with players around the world",
      type: "image"
    },
    {
      thumb: "/images/Youtube/thumb-vid-6.jpg",
      link: "",
      alt: "Compete with players around the world",
      type: "image"
    },
  ];
  function changeVideo(e, thumb, alt, type, link) {
    console.log(thumb, alt, type, link);
    e.preventDefault();
    setThumb(thumb);
    setAlt(alt);
    setGalleryType(type);
    setLink(link)
  }
  function scrollGallery(arrow) {
    if(arrow == 'right' && transform > -165) {
      setTransform(prevTransform => prevTransform - 220)
    } else if (arrow == 'left' && transform < 0) {
      setTransform(prevTransform => prevTransform + 220)
  }
  }

  return (
    <div className={styles.container}>
      <div className={styles.mainVideo}>
        { galleryType == 'video' ? <ReactPlayer width={"100%"} height={259} playing={true} light={thumb} playIcon={playButton} url="https://www.youtube.com/watch?v=" /> 
        : <ModalImage
        small={thumb}
        large={thumb}
        alt={alt}
      /> }
      </div>
      <div style={{transform: `translate(${transform}px, 0)`}} className={styles.bottomVideos}>
          {videos.map((x, index) => (
            <div key={index} className={styles.smallerVideo}>
              <button onClick={(e) => changeVideo(e, x.thumb, x.alt, x.type, x.link)}><img className={styles.mainImg} src={x.thumb} /></button>
            </div>
          ))}
      </div>
      <div onClick={() => scrollGallery('left')} className={styles.arrowLeft}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14.727" viewBox="0 0 16 14.727">
            <path id="Path_8777" data-name="Path 8777" d="M7.293,15.707a1,1,0,0,0,1.414,0l6.364-6.364a1,1,0,0,0-1.414-1.414L8,13.586,2.343,7.929A1,1,0,1,0,.929,9.343ZM7,0V15H9V0Z" transform="translate(16 -0.637) rotate(90)" fill="#fff"/>
          </svg>
        </div>
          <div onClick={() => scrollGallery('right')} className={styles.arrowRight}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="14.727" viewBox="0 0 16 14.727">
              <path id="Path_8777" data-name="Path 8777" d="M7.293,15.707a1,1,0,0,0,1.414,0l6.364-6.364a1,1,0,0,0-1.414-1.414L8,13.586,2.343,7.929A1,1,0,1,0,.929,9.343ZM7,0V15H9V0Z" transform="translate(0 15.363) rotate(-90)" fill="#fff"/>
            </svg>
          </div>
    </div>
  );
};

export default YoutubeVideos;
