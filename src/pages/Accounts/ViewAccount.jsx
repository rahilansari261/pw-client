import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Button, Table } from "../../components/Index";
import { Link } from "react-router-dom";

export const ViewAccount = () => {
  const clickHandle = () => {};
  const handleSearch = () => {};
  const accountData = [
    {
      _id: "1",
      date: "30-Mar-2023",
      "Invoice Value": "25500",
      "payment received": "-",
      balance: 3000,
      mode: "cash",
      remark: "Invoice Cancelled by user",
    },
    {
      _id: "2",
      date: "30-Mar-2023",
      "Invoice Value": "25500",
      "payment received": "-",
      balance: 3000,
      mode: "cash",
      remark: "Invoice Cancelled by user",
    },
    {
      _id: "3",
      date: "30-Mar-2023",
      "Invoice Value": "25500",
      "payment received": "-",
      balance: 3000,
      mode: "cash",
      remark: "Invoice Cancelled by user",
    },
  ];

  const tableHelperData = {
    tableHeadRowData: Object.keys(accountData[0]),
  };
  return (
    <Main>
      <TitleSection>
        <TitleWrapper>
          <FontAwesomeIcon icon={faUsers} />
          <Title>Client Accounts</Title>
        </TitleWrapper>
        <Link to="/accounts/accountentry/1">
          <Button label="success" clickHandle={clickHandle}>
            Add Payment
          </Button>
        </Link>
      </TitleSection>
      <DetailSection>
        <SearcAndClientInfoWrapper>
          <ClientWrapper>
            <ClientInfo>
              <ClientTitle>Client Name :</ClientTitle>
              <ClientValue>Rahil Computers</ClientValue>
            </ClientInfo>
            <ClientInfo>
              <ClientTitle>Balance :</ClientTitle>
              <ClientValue>Rs.17600</ClientValue>
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
        <Table tableData={accountData} tableHelperData={tableHelperData} />
      </DetailSection>
    </Main>
  );
};

const Main = styled.div`
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
`;

const SearchOption = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
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
