import styles from "./AllTabs.module.sass";
import cn from "classnames";
import NoData from "../../../../components/NoData"
import {calculateStakeReturns} from "../../../../functions/stake";
import {formatEther} from "@ethersproject/units";
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
import ReactTooltip from 'react-tooltip';

export const THEME = {
    HeaderRow: `
      font-size: 14px;
      color: #333;
      font-weight: 600;
      background-color: #fff;
      padding: 10px 0;
    `,
    Row: `
      font-size: 14px;
      padding: 10px 0;
      &:nth-of-type(2n+1) {
        background-color: #fff;
      }
    
      &:nth-of-type(2n) {
        background-color: #fff;
      }
    `,
};


const FirstTab = () => {
    const stakeRecords = [];

    const claimRecord = (index, contract, e) => {
        try {
            contract.unstake(index)
        } catch (e){
            console.log("unstaking error", e);
        }
    };

    const list = stakeRecords.map((x, index) => {
        const { APY } = calculateStakeReturns(x.amount, x.lockDays/30, x.shareBonus, x.shareLongBonus,);
        const stakedDays = x.lockDays;
        const date = new Date(x.lockTimestamp*1000);
        const today = new Date();
        const DifferenceInTime = today.getTime() - date.getTime();
        const DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24);
        const unstakeInMonths = Math.floor((stakedDays - DifferenceInDays)/30);
        const unstakeInDays = Math.floor(stakedDays - DifferenceInDays);
        const claimingAvailability = x.version !== "1";
        return {
            amount: (+formatEther(x.amount.toString())).toFixed(2),
            duration: x.lockDays/30,
            apr: APY.toFixed(2),
            date: date.toLocaleString(),
            id: x.id,
            contract: x.contract,
            unstakeMonths: unstakeInMonths,
            unstakeDays: unstakeInDays,
            claimingAvailability: claimingAvailability,
        }
    })

    const data = { nodes: list };
    const theme = useTheme(THEME);
    const pagination = usePagination(data, {
        state: {
          page: 0,
          size: 10,
        },
        onChange: onPaginationChange,
      });
    
      function onPaginationChange(action, state) {
        console.log(action, state);
      }
    const today = new Date();
  return (
    <div className="FirstTab">
    {/* Change this list to !== to work prop in case already have data */}
    { list.length == 0 ?
    <div className={cn(styles.tableContainer)}>
        <Table data={data} pagination={pagination} theme={theme}>
              {(tableList) => (
                  <>
                  <Header>
                  <HeaderRow>
                      <HeaderCell className={cn(styles.tableNumber)}></HeaderCell>
                      <HeaderCell className={cn(styles.tableAmount)}>Amount to claim</HeaderCell>
                      <HeaderCell className={cn(styles.tableDateTitle)}>Date & time (UTC)</HeaderCell>
                      <HeaderCell></HeaderCell>
                  </HeaderRow>
                  </Header>
  
                  <Body>
                      {tableList.map((x, index) => (
                      <Row key={x.id} item={x}>
                          <Cell className={cn(styles.tableNumber)}>{index + 1}.</Cell>
                          <Cell className={cn(styles.tableAmount)}>{x.amount}</Cell>
                          <Cell className={cn(styles.tableDate)}>{x.date}</Cell>
                          <Cell className={cn(styles.tableUnstake)}>
                              <ReactTooltip />
                              <button 
                                onClick={(e) => claimRecord(x.id, x.contract, e)} 
                                data-tip={`You have staked for ${x.duration} months, unstake will be available after ${x.unstakeDays > 35 ? x.unstakeMonths : x.unstakeDays} ${x.unstakeDays > 35 ? 'months.' : 'days.'}`}
                                >Claim
                              </button>
                          </Cell>
                      </Row>
                      ))}
                  </Body>
                  </>
              )}
        </Table>
        { pagination.state.getTotalPages(data.nodes) > 1 ?
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
    : null }
    </div>
      : <NoData text={'There is nothing to claim yet.'} />
    }
    </div>
  );
};
export default FirstTab;