import { useState } from "react";
import cn from "classnames";
import styles from "./Scores.module.sass";
import {
  Table,
  Header,
  HeaderRow,
  HeaderCell,
  Body,
  Row,
  Cell,
} from '@table-library/react-table-library/table';
import { usePagination } from '@table-library/react-table-library/pagination';
import GameStats from "./GameStats"
import { useTheme } from '@table-library/react-table-library/theme';
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import Title from "../../../components/Title";
import Button from "../../../components/Button";
import { firstPlaceSvg, live } from "../../../constants/svg";
export const THEME = {
  HeaderRow: `
    font-size: 14px;
    color: white;
    font-weight: 600;
    background-color: #277ABD;
    padding: 10px 0;
    z-index: 2;
    text-align: center;
  `,
  Row: `
    font-size: 14px;
    padding: 15px 0;
    margin: 5px 0;
    &:nth-of-type(2n+1) {
      background-color: #277ABD;
    }
  
    &:nth-of-type(2n) {
      background-color: #277ABD;
    }
  `,
};

const Profile = () => {
  const [players, setPlayers] = useState([]);
  const [players2, setPlayers2] = useState();
  const [newArray, setNewArray] = useState();
  const [noDataMessage, setNoDataMessage] = useState('');
  const [guild, setGuild] = useState([]);
  const username = localStorage.getItem('username');
  const guildLocal = localStorage.getItem('guild');

  const data = { nodes: players };
  const data2 = { nodes: newArray };

  const theme = useTheme(THEME);
  const pagination = usePagination(data, {
    state: { page: 0, size: 3 },
  });

  const myScores = players.find(element => element.username == username) ? players.find(element => element.username == username).score : null ?? 0;
  const myPlaceIs = players.indexOf(players.find(element => element.username == username)) === -1 ? '...' : players.indexOf(players.find(element => element.username == username)) + 1;

  return (
    <div className={cn(styles.section)}>
      <div className={cn(styles.container)}>
        <div>
          <Title>LeaderBoard</Title>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.liveRow}>
            <span>{live} Live</span>
          </div>
          {noDataMessage == '' ? <Table className={styles.scoresTable} data={players2 ? data2 : data} pagination={pagination} theme={theme}>
            {(tableList) => (
              <div className={styles.tableWrapper}>
                <Header className={styles.scoresTableHeader}>
                  <HeaderRow>
                    <HeaderCell className={cn(styles.tablePlaceTitle)}>Place</HeaderCell>
                    <HeaderCell className={cn(styles.tableAmount)}>Player</HeaderCell>
                    <HeaderCell className={cn(styles.tableGuild)}>Guild</HeaderCell>
                    <HeaderCell className={cn(styles.tableScores)}>Score</HeaderCell>
                  </HeaderRow>
                </Header>

                <Body className={styles.scoresTableBody}>
                  {tableList.map((x, index) => (
                    <Row key={index} item={x} className={index == 0 ? styles.firstPlace : index == 1 ? styles.secondPlace : index == 2 ? styles.thirdPlace : styles.otherPlayers}>
                      <Cell className={styles.tablePlace}>{index + 1} {index < 3 ? firstPlaceSvg : null} </Cell>
                      <Cell className={styles.tableAmount}><Link to={`/profile/${x.username}`}>{x.username}</Link></Cell>
                      <Cell className={styles.tableGuild}>{guild.filter(guild => guild.username === x.username).map((y, index) => (<p key={index}>{y.guild}</p>))}</Cell>
                      <Cell className={cn(styles.tableScores)}>{x.score}</Cell>
                    </Row>
                  ))}
                  <Row className={styles.thisIsMyPlace}>
                    <Cell className={styles.tablePlace}>{myPlaceIs}</Cell>
                    <Cell className={styles.tableAmount}><Link to={`/profile/${username}`}>{username}</Link></Cell>
                    <Cell className={styles.tableGuild}>{guildLocal}</Cell>
                    <Cell className={styles.tableScores}>{myScores}</Cell>
                  </Row>
                </Body>
              </div>
            )}
          </Table> : noDataMessage}
          <Link className={styles.linkButtonContainer} to={'/leaderboard'}><Button>Show full leaderboard</Button></Link>
        </div>
      </div>
      <GameStats />
    </div>
  );
};

export default Profile;