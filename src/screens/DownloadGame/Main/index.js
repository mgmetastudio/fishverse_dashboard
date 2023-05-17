import YoutubeVideos from "./YoutubeVideos";
import Download from "./Download";
import HowToPlay from "./HowToPlay";
import cn from "classnames";
import styles from "./MainDownloadGame.module.sass";
import Title from "../../../components/Title"

const MainDownloadGame = () => {
  return (
    <div className={cn("section", styles.section)}>
        <div className={cn("container", styles.container)}>
        <Title>Game download</Title>
        <div className={styles.containerInner}>
            <div className={styles.left}>
                <YoutubeVideos />
                <HowToPlay />
            </div>
            <div className={styles.right}>
            <Download />
            </div>
        </div>
      </div>
    </div>
  );
};

export default MainDownloadGame;
