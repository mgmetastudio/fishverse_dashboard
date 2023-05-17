import React from "react";
import styles from "./AllTabs.module.sass";
import cn from "classnames";
import NoData from "../../../../components/NoData"
import {formatEther} from "@ethersproject/units";
import {THEME} from "./FirstTab";
import {Table, Header, HeaderRow, HeaderCell, Body, Row, Cell} from '@table-library/react-table-library/table';
import { usePagination } from '@table-library/react-table-library/pagination';
import { useTheme } from '@table-library/react-table-library/theme';
import {useStakeRewardRecords} from "../../../../hooks/useStakeRewardRecords";
import {useStakeRecords} from "../../../../hooks/useStakeRecords";

const ThirdTab = () => {
    const stakeRewardRecords = [];
    const stakeRecords = [];
    const data = { nodes: stakeRewardRecords };
    const theme = useTheme(THEME);
    const pagination = usePagination(data, {
        state: {
            page: 0,
            size: 10,
        }
    });
    return (
        <div className="FirstTab">
            {stakeRewardRecords.length !== 0 ?
                <div className={cn(styles.tableContainer)}>
                    <Table data={data} pagination={pagination} theme={theme}>
                        {(tableList) => (
                            <>
                            <Header>
                                <HeaderRow>
                                    <HeaderCell className={cn(styles.tableNumber)}></HeaderCell>
                                    <HeaderCell className={cn(styles.tableAmount)}>Reward amount</HeaderCell>
                                    <HeaderCell className={cn(styles.tableAdditionalTitle)}>Additional rewards amount</HeaderCell>
                                    <HeaderCell>Reward claim date (UTC)</HeaderCell>
                                </HeaderRow>
                            </Header>

                            <Body>
                            {tableList.map((x, index) => (
                                <Row key={index} item={x}>
                                    <Cell className={cn(styles.tableNumber)}>{index + 1}.</Cell>
                                    <Cell className={cn(styles.tableAmount)}>{(+formatEther(x.amount)).toFixed(2)} FVS</Cell>
                                    <Cell className={cn(styles.tableAdditional)}>
                                        <div className={styles.buttonAdditionalReward}><span>0</span><p>Land WL</p></div>
                                        <div className={styles.buttonAdditionalReward}><span>0</span><p>ES Mystery Box</p></div>
                                        <div className={styles.buttonAdditionalReward}><span>0</span><p>Alpha key</p></div>
                                        <div className={styles.buttonAdditionalReward}><span>0</span><p>Badges</p></div>
                                    </Cell>
                                    <Cell className={cn(styles.tableDuration)}>{new Date(x.timestamp*1000).toLocaleString()}</Cell>
                                </Row>
                            ))}
                            </Body>
                            </>
                        )}
                    </Table>
                    {pagination.state.getTotalPages(data.nodes) > 1 ?
                        <div className={cn(styles.paginationContainer)}>
                      <span>
                          Page:{' '}
                          {pagination.state.getPages(data.nodes).map((_, index) => (
                              <button
                                  key={index}
                                  className={cn(styles.nextPage)}
                                  type="button"
                                  style={{
                                      background:
                                          pagination.state.page === index
                                              ? '#202224'
                                              : '#323232',
                                  }}
                                  onClick={() => pagination.fns.onSetPage(index)}
                              >
                                  {index + 1}
                              </button>
                          ))}
                      </span>
                        </div>
                        : null}
                </div>
                : <NoData text={'There is no current rewards yet.'}/>
            }
        </div>
    );
};

export default ThirdTab;