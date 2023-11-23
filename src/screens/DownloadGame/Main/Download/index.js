import Image from "../../../../components/Image";
import styles from "./Download.module.sass";
import { android, apple, macos, win, windowsDownload } from "../../../../constants/svg";

const YoutubeVideos = () => {
  return (
    <div className={styles.containerDownload}>
      <Image
        className={styles.pic}
        src={'/images/Youtube/thumb-vid-1-logo.jpg'}
        srcDark={'/images/Youtube/thumb-vid-1-logo.jpg'}
        alt={'download fishverse game'}
      />
      <p>FishVerse is a revolutionary AAA fishing game that is open world, decentralized, and built on blockchain technology. It brings together millions of fishing and P2E enthusiasts. Inside a vibrant community where people can monetize by catching and utilizing NFT fish, competing in tournaments, completing missions, building businesses, and more... All of this is available on any device!</p>
      <div className={styles.downloadButtons}>
        <a href="https://play.google.com/store/apps/details?id=com.mglabsltd.fishverse" target="_blank">{android}</a>
        <a href="https://drive.google.com/file/d/1CXLpkzMXGjJ4BzZZEs3mZAXu64ZM1Xvl/view?usp=share_link" target="_blank">{windowsDownload}</a>
      </div>
      <div className={styles.requirementsContainer}>
        <h4>System requirements for <span className={styles.greenish}>Windows</span>{win}</h4>
        <div className={styles.requirements}>
          <p>Minimum</p>
          <ul>
            <li><span>OS:</span> Windows 8 / (64-bit) or greater</li>
            <li><span>Processor:</span> Intel i3-6100 / AMD Ryzen 3 1200, FX4350</li>
            <li><span>Memory:</span> 4 GB RAM</li>
            <li><span>Graphics:</span> NVIDIA GTX 960 / AMD Radeon R9 290</li>
            <li><span>DirectX:</span> Version 11</li>
            <li><span>Storage:</span> 10 GB available space</li>
          </ul>
        </div>
        <div className={styles.requirements}>
          <p>Recomended</p>
          <ul>
            <li><span>OS:</span> Windows 10 (64-bit) or greater</li>
            <li><span>Processor:</span> Intel i5-4590 / AMD Ryzen 5 1500X</li>
            <li><span>Memory:</span> 8 GB RAM</li>
            <li><span>Graphics:</span> NVIDIA GTX 1060 / AMD Radeon RX 480 </li>
            <li><span>DirectX:</span> Version 12</li>
            <li><span>Storage:</span> 10 GB available space</li>
          </ul>
        </div>
      </div>
      <div className={styles.requirementsContainer}>
        <h4>System requirements for <span className={styles.greenish}>MacOS</span> {macos}</h4>
        <div className={styles.requirements}>
          <p>Minimum</p>
          <ul>
            <li><span>Processor:</span>Quad-core Intel i5 or Apple M1</li>
            <li><span>Memory:</span> 8 GB RAM</li>
            <li><span>Storage:</span> 10 GB available space</li>
          </ul>
        </div>
        <div className={styles.requirements}>
          <p>Recommended</p>
          <ul>
            <li><span>Processor:</span> Quad-core Intel i5 or Apple M1 Pro</li>
            <li><span>Memory:</span> 16 GB RAM</li>
            <li><span>Storage:</span> 10 GB available space</li>
            <li>Mouse is recommended for best experience </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default YoutubeVideos;
