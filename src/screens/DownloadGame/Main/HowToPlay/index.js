import cn from "classnames";
import styles from "./HowToPlay.module.sass";
import { Link } from "react-router-dom";

const YoutubeVideos = () => {
  return (
    <>
      <div className={cn(styles.requirementsContainer)}>
          <h4>System requirements for <span className={styles.greenish}>Windows</span><svg width="22" height="22" viewBox="0 0 257 257" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.5 36.357L105.12 22.11L105.165 123.024L0.595 123.619L0.5 36.358V36.357ZM105.07 134.65L105.15 235.652L0.581 221.275L0.575 133.973L105.069 134.65H105.07ZM117.752 20.245L256.468 0V121.74L117.752 122.84V20.246V20.245ZM256.5 135.6L256.467 256.791L117.751 237.213L117.557 135.373L256.5 135.6Z" fill="white"/>
</svg>
</h4>
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
      <div className={cn(styles.requirementsContainer)}>
        <h4>System requirements for <span className={styles.greenish}>MacOS</span> <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M18.5891 8.1816C18.4523 8.2896 16.037 9.6744 16.037 12.7536C16.037 16.3152 19.1104 17.5752 19.2024 17.6064C19.1882 17.6832 18.7141 19.332 17.5819 21.012C16.5724 22.4904 15.518 23.9664 13.9141 23.9664C12.3102 23.9664 11.8974 23.0184 10.0458 23.0184C8.24138 23.0184 7.5998 23.9976 6.13268 23.9976C4.66555 23.9976 3.64187 22.6296 2.46487 20.9496C1.10152 18.9768 0 15.912 0 13.0032C0 8.3376 2.98143 5.8632 5.91568 5.8632C7.47479 5.8632 8.77445 6.9048 9.75332 6.9048C10.685 6.9048 12.138 5.8008 13.9117 5.8008C14.584 5.8008 16.9993 5.8632 18.5891 8.1816ZM13.0697 3.8256C13.8032 2.94 14.3222 1.7112 14.3222 0.4824C14.3222 0.312 14.308 0.1392 14.2773 0C13.0838 0.0456 11.6639 0.8088 10.8077 1.8192C10.1354 2.5968 9.50801 3.8256 9.50801 5.0712C9.50801 5.2584 9.53868 5.4456 9.55283 5.5056C9.62831 5.52 9.75096 5.5368 9.87361 5.5368C10.9445 5.5368 12.2913 4.8072 13.0697 3.8256Z" fill="white"/>
</svg>
</h4>
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
    </>
  );
};

export default YoutubeVideos;
