import styles from "./AllTabs.module.sass";
import cn from "classnames";
import NoData from "../../../../components/NoData"
import {formatEther} from "@ethersproject/units";
import {Table, Header, HeaderRow, HeaderCell, Body, Row, Cell} from '@table-library/react-table-library/table';
import { usePagination } from '@table-library/react-table-library/pagination';
import { useTheme } from '@table-library/react-table-library/theme';
import {calculateLastMonthProfit} from "../../../../functions/stake";
import {THEME} from "./FirstTab";


const SecondTab = () => {
    const stakeRecords = [];

    const lastMonthRecords = calculateLastMonthProfit(stakeRecords);
    const data = { nodes: lastMonthRecords };
    const theme = useTheme(THEME);
    const pagination = usePagination(data, {
        state: {
            page: 0,
            size: 10,
        }
    });

    return (
        <div className="FirstTab">
            {lastMonthRecords.length !== 0 ?
                <div className={cn(styles.tableContainer)}>
                    <Table data={data} pagination={pagination} theme={theme}>
                        {(tableList) => (
                            <>
                            <Header>
                                <HeaderRow>
                                    <HeaderCell className={cn(styles.tableNumber)}></HeaderCell>
                                    <HeaderCell className={cn(styles.tableAmount)}>Bonus amount</HeaderCell>
                                    <HeaderCell>Staked amount</HeaderCell>
                                    <HeaderCell>Estimated APR</HeaderCell>
                                    <HeaderCell>Reward date (UTC)</HeaderCell>
                                </HeaderRow>
                            </Header>

                            <Body>
                            {tableList.map((x, index) => (
                                <Row key={index} item={x}>
                                    <Cell className={cn(styles.tableNumber)}>{index + 1}.</Cell>
                                    <Cell className={cn(styles.tableAmount)}>{x.monthlyBonus.toFixed(2)} FVS</Cell>
                                    <Cell className={cn(styles.tableDuration)}>{(+formatEther(x.staked)).toFixed(2)} FVS</Cell>
                                    <Cell className={cn(styles.tableestimatedAPR)}>{x.APY.toFixed(2)} %</Cell>
                                    <Cell className={cn(styles.tableDate)}>{x.claimableDate.toLocaleString()}</Cell>
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
                : <NoData text={'There is no tokens staked for more that a month to see the last month profit.'}/>
            }
        </div>
    );
};
export default SecondTab;