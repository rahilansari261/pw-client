import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Button, Table } from "../../components/Index";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import { LineWave } from "react-loader-spinner";
import { convertCurrencyToIndian, convertDate } from "../../util/helper";

export const ViewAccount = () => {
  const { data, isLoading, error, fetchData } = useFetch();
  const { data: clientData, isLoading: clientIsLoading, error: clientError, fetchData: clientFetch } = useFetch();
  const { id } = useParams();
  const [accountData, setAccountData] = useState(null);
  const [clientAccountData, setClientAccountData] = useState(null);

  useEffect(() => {
    fetchData(`accounts/${id}/no-search/1/10/no-start-date/no-end-date`);
    clientFetch(`clients/${id}`);
  }, []);

  const senitizeAccountTableData = (accArr) => {
    return accArr.map((item) => {
      const { _id, entry_date, entry_amount_out, entry_amount_in, entry_transaction_number, entry_remarks, entry_balance } = item;
      return {
        _id,
        entry_date: convertDate(entry_date),
        entry_amount_out: convertCurrencyToIndian(entry_amount_out),
        entry_amount_in: convertCurrencyToIndian(entry_amount_in),
        entry_balance: convertCurrencyToIndian(entry_balance),
        entry_transaction_number,
        entry_remarks,
      };
    });
  };

  useEffect(() => {
    if (!isLoading) {
      const newAccData = senitizeAccountTableData(data.data);
      setAccountData(newAccData);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!clientIsLoading) {
      setClientAccountData(clientData.data);
    }
  }, [clientIsLoading]);

  const clickHandle = () => {};
  const handleSearch = () => {};

  const tableHelperData = {
    actionColumnSrc: null,
    tableHeadRowData: ["id", "date", "Invoice Value ", "payment received", "balance", "mode", "remark"],
  };

  return (
    <Main>
      <TitleSection>
        <TitleWrapper>
          <FontAwesomeIcon icon={faUsers} />
          <Title>Client Accounts</Title>
        </TitleWrapper>
        {clientAccountData !== null && (
          <Link to={`/accounts/accountentry/${clientAccountData._id}`}>
            <Button label="success" clickHandle={clickHandle}>
              Add Payment
            </Button>
          </Link>
        )}
      </TitleSection>
      <DetailSection>
        <SearcAndClientInfoWrapper>
          <ClientWrapper>
            <ClientInfo>
              <ClientTitle>Client Name :</ClientTitle>
              {clientAccountData !== null ? <ClientValue>{clientAccountData.client_name}</ClientValue> : `Loading...`}
            </ClientInfo>
            <ClientInfo>
              <ClientTitle>Balance :</ClientTitle>
              {clientAccountData !== null ? <ClientValue>{clientAccountData.client_balance}</ClientValue> : `Loading...`}
            </ClientInfo>
          </ClientWrapper>
          <SearchOption>
            <SearchBar>
              <SearchTitle>Remark :</SearchTitle>
              <Input type="text" placeholder="Search" />
            </SearchBar>
            <DateBar>
              <SearchTitle>Date From :</SearchTitle>
              <DateInput type="date" name="" id="" />
            </DateBar>
            <DateBar>
              <SearchTitle>Date To :</SearchTitle>
              <DateInput type="date" name="" id="" />
            </DateBar>
            <DateBar>
              <SearchTitle></SearchTitle>
              <SearchButton>
                <Button label="info" clickHandle={handleSearch}>
                  Search
                </Button>
              </SearchButton>
            </DateBar>
          </SearchOption>
        </SearcAndClientInfoWrapper>
        {!isLoading && accountData !== null ? (
          <Table tableData={accountData} tableHelperData={tableHelperData} />
        ) : (
          <LineWave height="100" width="100" color="#003545" ariaLabel="line-wave" wrapperStyle={{}} wrapperClass="" visible={true} firstLineColor="" middleLineColor="" lastLineColor="" />
        )}
      </DetailSection>
    </Main>
  );
};

const Main = styled.div`
  position: relative;
  z-index: 0;
  margin: 2em;
  background-color: var(--white-color);
  color: black;
  border-radius: 4px;
  @media (max-width: 550px) {
    padding-top: 4em;
    margin: 0em;
    border-radius: 0px;
  }
`;
const TitleSection = styled.div`
  background-color: var(--table-title-section);
  padding: 0.75em 1em;
  border-radius: 4px 4px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 60px;
`;
const DetailSection = styled.div`
  background-color: var(--white-color);
  padding: 1em;
  border-radius: 0 0 4px 4px;
  max-width: 100%;
  overflow-x: auto;
  margin: 0 auto;
`;
const SearcAndClientInfoWrapper = styled.div`
  padding: 1em;
  display: flex;
  margin-bottom: 8px;
  background-color: var(--table-title-section);
  border-radius: 6px;
  box-shadow: 0.5px 0.5px 0.5px rgba(51, 51, 51, 0.36);
  margin-bottom: 3em;
  @media (max-width: 550px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
`;
const ClientWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  @media (max-width: 550px) {
    width: 100%;
    padding-bottom: 16px;
  }
`;
const ClientInfo = styled.div`
  display: flex;
  justify-content: space-around;
`;
const ClientTitle = styled.div`
  flex: 1;
  text-align: end;
`;
const ClientValue = styled.div`
  flex: 1;
  padding-left: 3em;
  text-align: left;
  @media (max-width: 550px) {
    padding-left: 1em;
  }
`;

const SearchOption = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  @media (max-width: 550px) {
    width: 100%;
  }
`;
const SearchBar = styled.div`
  display: flex;
  padding-bottom: 8px;
`;
const DateBar = styled.div`
  display: flex;
  padding-bottom: 8px;
`;
const SearchButton = styled.div`
  flex: 3;
  margin-left: 16px;
`;
const Input = styled.input`
  background-color: var(--white-color);
  flex: 3;
  padding: 8px;
  margin-left: 20px;
  color: var(--black-color);
  border: 1px solid var(--table-border-color);
  border-radius: 4px;
  width: 100%;
  outline: none;
  font-family: inherit;
  &:focus {
    box-shadow: var(--input-bs);
  }
`;
const SearchTitle = styled.div`
  flex: 1;
  text-align: end;
  min-width: 80px;
`;
const DateInput = styled.input`
  flex: 3;
  background-color: var(--white-color);
  padding: 8px;
  margin-left: 20px;
  color: var(--black-color);
  border: 1px solid var(--table-border-color);
  border-radius: 4px;
  width: 100%;
  outline: none;
  font-family: inherit;

  &:focus {
    box-shadow: var(--input-bs);
  }
  &::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
`;
const Title = styled.div`
  padding-left: 8px;
  font-family: "Cabin-bold";
`;

const TitleWrapper = styled.div`
  display: flex;
`;
