import { useState } from 'react'
import styled from 'styled-components'
import { Button, Table } from '../../components/Index'

export const TaxAndTerms = () => {
  const clickHandle = () => {
    console.log('heyyyyyyyyy!!!!!!!1')
  }

  const initTaxData = [
    {
      _id: '1',
      tax: 'GST',
      rate: '2',
    },
    {
      _id: '2',
      tax: 'GST',
      rate: '8',
    },
    {
      _id: '3',
      tax: 'GST',
      rate: '12',
    },
    {
      _id: '4',
      tax: 'GST',
      rate: '18',
    },
  ]
  const [taxData, setTaxData] = useState(initTaxData)

  const tableHelperData = {
    actionColumnSrc: null,
    actionColumnTitle: 'Action',
    actionColumnValue: 'Delete',
    actionColumnColor: 'danger',
    tableHeadRowData: Object.keys(taxData[0]),
  }
  let newTaxObj = {
    _id: '',
    tax: '',
    rate: '',
  }
  const addTax = () => {
    setTaxData((prev) => [...prev, { ...newTaxObj, _id: taxData.length + 1 }])
    
  }
  return (
    <Wrapper>
      <TermsWrapper>
        <TermsTitle>Terms & Conditions</TermsTitle>
        <TextArea
          type='text'
          name='terms'
          id='terms'
          autoComplete='off'
          placeholder='These are the terms and conditions you can change it for your invoice i you want.'
          rows='7'
        />
        <Button label='success' clickHandle={clickHandle}>
          Update Terms & Conditions
        </Button>
      </TermsWrapper>
      <TaxWrapper>
        <TaxTitle>Taxes</TaxTitle>
        <InputTax>
          <Input
            type='text'
            name='tax_name'
            id='tax_name'
            autoComplete='off'
            placeholder='Tax name.'
            onChange={(e) => {
              e.preventDefault()
              newTaxObj.tax = e.target.value
            }}
          />
          <Input
            type='number'
            name='tax_rate'
            id='tax_rate'
            autoComplete='off'
            placeholder='Tax rate.'
            onChange={(e) => {
              e.preventDefault()
              newTaxObj.rate = e.target.value
            }}
          />
          <Button label='success' clickHandle={addTax}>
            Add Tax
          </Button>
        </InputTax>
        <Table tableData={taxData} tableHelperData={tableHelperData}></Table>
      </TaxWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 2em;
`
const TermsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
const TermsTitle = styled.div`
  margin-bottom: 8px;
`
const TaxTitle = styled(TermsTitle)``
const TaxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`
const InputTax = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`

const Input = styled.input`
  background-color: var(--white-color);
  padding: 8px;
  color: var(--black-color);
  border: 1px solid var(--table-border-color);
  border-radius: 4px;
  outline: none;
  font-family: inherit;
  &:focus {
    box-shadow: var(--input-bs);
  }
`

const TextArea = styled.textarea`
  background-color: var(--white-color);
  padding: 8px;
  color: var(--black-color);
  border: 1px solid var(--table-border-color);
  border-radius: 4px;
  margin-bottom: 8px;
  outline: none;
  font-family: inherit;
  &:focus {
    box-shadow: var(--input-bs);
  }
`
