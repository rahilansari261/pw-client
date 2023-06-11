import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { Pagination } from "../../components/Pagination";
import { Table } from "../../components/Table";
import useFetch from "../../hooks/useFetch";
import { useEffect } from "react";
import { convertCurrencyToIndian } from "../../util/helper";
import { LineWave } from "react-loader-spinner";

export const AccountList = () => {
  const { data, isLoading, error, fetchData } = useFetch();
  useEffect(() => {
    fetchData("clients/1/10/All");
  }, []);
  let accountData;
  const sanitizeTableData = (cData) =>
    cData.map((client) => {
      const { _id, client_company_name, client_name, client_balance } = client;
      return { _id, client_company_name, client_name, client_balance: convertCurrencyToIndian(client_balance) };
    });

  if (!isLoading) {
    const { data: cData } = data;
    accountData = sanitizeTableData(cData);
  }
  const clickHandle = () => {};
  const handleSearch = () => {};
  const btnFunc = () => {};
  const tableHelperData = {
    actionColumnSrc: "/accounts/viewaccount/",
    actionColumnTitle: "Action",
    actionColumnValue: "Account History",
    actionColumnColor: "info",
    tableHeadRowData: ["id", "company", "name", "balance"],
    actionColumnButtonFunc: btnFunc,
  };

  return (
    <Main>
      <TitleSection>
        <TitleWrapper>
          <FontAwesomeIcon icon={faUsers} />
          <Title>Accounts</Title>
        </TitleWrapper>
      </TitleSection>
      <DetailSection>
        <SearchWrapper>
          <SearchBar>
            <Input type="text" placeholder="Search" />
            <Button label="info" clickHandle={handleSearch}>
              Search
            </Button>
          </SearchBar>

          <SearchDesc></SearchDesc>
        </SearchWrapper>

        {!isLoading ? (
          <Table tableData={accountData} tableHelperData={tableHelperData} />
        ) : (
          <LineWave height="100" width="100" color="#003545" ariaLabel="line-wave" wrapperStyle={{}} wrapperClass="" visible={true} firstLineColor="" middleLineColor="" lastLineColor="" />
        )}
        <Pagination />
      </DetailSection>
      <Outlet />
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
const SearchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const SearchBar = styled.div`
  display: flex;
  width: 40%;
  gap: 12px;
  align-items: center;
  @media (max-width: 550px) {
    width: 70%;
  }
`;
const Input = styled.input`
  background-color: var(--white-color);
  padding: 8px;
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
const SearchDesc = styled.div``;
const Title = styled.div`
  padding-left: 8px;
  font-family: "Cabin-bold";
`;

const TitleWrapper = styled.div`
  display: flex;
`;
