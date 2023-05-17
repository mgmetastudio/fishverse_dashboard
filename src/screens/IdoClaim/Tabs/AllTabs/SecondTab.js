import styles from "./AllTabs.module.sass";
import cn from "classnames";
import NoData from "../../../../components/NoData"
import {formatEther} from "@ethersproject/units";
import {THEME} from "./FirstTab";
import {Table, Header, HeaderRow, HeaderCell, Body, Row, Cell} from '@table-library/react-table-library/table';
import { usePagination } from '@table-library/react-table-library/pagination';
import { useTheme } from '@table-library/react-table-library/theme';

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
    console.log(stakeRecords);
    return (
        <div className="FirstTab">
            {/* Change this list to !== to work prop in case already have data */}
            {stakeRewardRecords.length == 0 ?
                <div className={cn(styles.tableContainer)}>
                    <Table data={data} pagination={pagination} theme={theme}>
                        {(tableList) => (
                            <>
                            <Header>
                                <HeaderRow>
                                    <HeaderCell className={cn(styles.tableNumber)}></HeaderCell>
                                    <HeaderCell className={cn(styles.tableAmount)}>Reward amount</HeaderCell>
                                    <HeaderCell>Reward claim date (UTC)</HeaderCell>
                                </HeaderRow>
                            </Header>

                            <Body>
                            {tableList.map((x, index) => (
                                <Row key={index} item={x}>
                                    <Cell className={cn(styles.tableNumber)}>{index + 1}.</Cell>
                                    <Cell className={cn(styles.tableAmount)}>{(+formatEther(x.amount)).toFixed(2)} FVS</Cell>
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