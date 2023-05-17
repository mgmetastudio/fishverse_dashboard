import React, { useState, useEffect } from "react";
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
import { useTheme } from '@table-library/react-table-library/theme';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const THEME = {
  HeaderRow: `
    font-size: 14px;
    color: white;
    font-weight: 600;
    background-color: #0D5590;
    padding: 10px 0;
    z-index: 2;
  `,
  Row: `
    font-size: 14px;
    padding: 15px 0;
    margin: 5px 0;
    &:nth-of-type(2n+1) {
      background-color: #0D5590;
    }
  
    &:nth-of-type(2n) {
      background-color: #0D5590;
    }
  `,
};

const Profile = () => {
  const mhuntCoin = <img height="20" src="/images/fisher-coin.png" />
  const [players, setPlayers] = useState([]);
  const [players2, setPlayers2] = useState();
  const date = new Date().toUTCString();
  const [startDate, setStartDate] = useState();
  const [newArray, setNewArray] = useState();
  const [noDataMessage, setNoDataMessage] = useState('');
  const [dateIsToday, setDateIsToday] = useState(true);
  const [guild, setGuild] = useState([]);

  const data = { nodes: players };
  const data2 = { nodes: newArray };

  const theme = useTheme(THEME);
  const pagination = usePagination(data, {
    state: { page: 0, size: 50 }
  });

  return (
    <div className={cn(styles.section)}>
      <div className={cn(styles.container)}>
        <div>
          <h3>LeaderBoard</h3>
          <span className={styles.tinyDate}>Last updated {date}</span>
        </div>
        <div className={styles.tableContainer}>
          <div className={styles.dropDownContainer}>
            <DatePicker
              className={styles.datePicker}
              selected={startDate}
              placeholderText="Today"
            />
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
                    <HeaderCell>Reward</HeaderCell>
                  </HeaderRow>
                </Header>

                <Body className={styles.scoresTableBody}>
                  {tableList.map((x, index) => (
                    <Row key={index} item={x} className={index == 0 ? styles.firstPlace : index == 1 ? styles.secondPlace : index == 2 ? styles.thirdPlace : styles.otherPlayers}>
                      <Cell className={styles.tablePlace}>{index + 1} {index < 3 ? firstPlaceSvg : null} </Cell>
                      <Cell className={styles.tableAmount}>{x.username}</Cell>
                      <Cell className={styles.tableGuild}>{guild.filter(guild => guild.username === x.username).map((y, index) => (<p key={index}>{y.guild}</p>))}</Cell>
                      <Cell className={cn(styles.tableScores)}>{x.score}</Cell>
                      <Cell className={styles.tableReward}>
                        {!dateIsToday && index < 50 && x.score > 0 ? mhuntCoin : null}
                        {index == 0 && !dateIsToday ? ' 300 SALT'
                          : index == 1 && !dateIsToday ? ' 200 SALT'
                            : index == 2 && !dateIsToday ? ' 200 SALT'
                              : index == 3 && !dateIsToday ? ' 150 SALT'
                                : index == 4 && !dateIsToday ? ' 125 SALT'
                                  : index == 5 && !dateIsToday ? ' 100 SALT'
                                    : index == 6 && !dateIsToday ? ' 75 SALT'
                                      : index == 7 && !dateIsToday ? ' 50 SALT'
                                        : index == 8 && !dateIsToday ? ' 50 SALT'
                                          : index == 9 && !dateIsToday ? ' 50 SALT'
                                            : index == 10 && !dateIsToday ? ' 50 SALT'
                                              : index == 11 && !dateIsToday ? ' 40 SALT'
                                                : index == 12 && !dateIsToday ? ' 40 SALT'
                                                  : index == 13 && !dateIsToday ? ' 40 SALT'
                                                    : index == 14 && !dateIsToday ? ' 40 SALT'
                                                      : index > 14 && index < 20 && !dateIsToday && x.score > 0 ? ' 30 SALT'
                                                        : index > 19 && index < 30 && !dateIsToday && x.score > 0 ? ' 20 SALT'
                                                          : index > 29 && index < 40 && !dateIsToday && x.score > 0 ? ' 10 SALT'
                                                            : index > 39 && index < 50 && !dateIsToday && x.score > 0 ? ' 5 SALT'
                                                              : null}</Cell>

                    </Row>
                  ))}
                </Body>
              </div>
            )}
          </Table> : noDataMessage}
        </div>
      </div>
    </div>
  );
};

export default Profile;