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
  ] 
  const [taxData, setTaxData] = useState(initTaxData)
  const [tax, setTax] = useState('')
  const [rate, setRate] = useState('')

  const addTax = () => {
    if (tax == '' || rate == '') return
    setTaxData((prev) => [
      ...prev,
      { _id: taxData.length + 1, tax: tax.toUpperCase(), rate: rate },
    ])
    setTax('')
    setRate('')
  }
  const removeTax = (id) => {
    console.log(taxData)
    setTaxData((prev) => prev.filter((pre) => pre._id != id))
  }
  const tableHelperData = {
    actionColumnSrc: null,
    actionColumnTitle: 'Action',
    actionColumnValue: 'Delete',
    actionColumnColor: 'danger',
    tableHeadRowData: taxData.length != 0 ? Object.keys(taxData[0]) : null,
    actionColumnButtonFunc: removeTax,
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
          placeholder='These are the terms and conditions you can change it for your invoice if you want.'
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
            name='tax'
            id='tax'
            autoComplete='off'
            placeholder='Tax name.'
            value={tax}
            onChange={(e) => setTax(e.target.value)}
          />
          <Input
            type='number'
            name='rate'
            id='rate'
            autoComplete='off'
            placeholder='Tax rate.'
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
          <Button label='success' clickHandle={addTax}>
            Add Tax
          </Button>
        </InputTax>
        {taxData.length != 0 ? (
          <Table tableData={taxData} tableHelperData={tableHelperData}></Table>
        ) : null}
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
