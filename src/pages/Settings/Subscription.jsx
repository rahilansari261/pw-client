import styled from 'styled-components'
import { Button, Table, Badge } from '../../components/Index'

export const Subscription = () => {
  const clickHandle = () => {}
  const subsData = [
    {
      _id: '1',
      date: '15-Jan-2023',
      'transaction id': '985ZA37FFTS3223',
      amount: 15500,
      status: <Badge label='success'>success</Badge>,
      remark: 'Your subscription is done through online payment.',
    },
    {
      _id: '2',
      date: '15-Jan-2022',
      'transaction id': '455ZA37FFTS3223',
      amount: 15500,
      status: <Badge label='warning'>pending</Badge>,
      remark: 'Your subscription is pending.',
    },
    {
      _id: '3',
      date: '15-Jan-2021',
      'transaction id': '205ZA37FFTS3223',
      amount: 23500,
      status: <Badge label='danger'>cancelled</Badge>,
      remark: 'Your subscription is cacelled due to error.',
    },
  ]

  const tableHelperData = {
    tableHeadRowData: Object.keys(subsData[0]),
  }
  return (
    <>
      <RenewSubsciption>
        <SubsNote>Your subscription ends on: 31-Dec-2023</SubsNote>
        <Button label='success' clickHandle={() => clickHandle}>
          Renew your subscription
        </Button>
      </RenewSubsciption>
      <Table tableData={subsData} tableHelperData={tableHelperData}></Table>
    </>
  )
}

const RenewSubsciption = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1em;
`
const SubsNote = styled.div`
  font-size: 14px;
`
