import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Button } from "../../components/Button";
import { Pagination } from "../../components/Pagination";
import { Table } from "../../components/Table";
import useFetch from "../../hooks/useFetch";
import { LineWave } from "react-loader-spinner";

export const ClientList = () => {
  const { data, isLoading, error } = useFetch("https://pw-backend.onrender.com/api/v1/clients/1/10/All");
  let clientData;
  const sanitizeTableData = (cData) =>
    cData.map((client) => {
      const { _id, client_company_name, client_name, client_phone } = client;
      return { _id, client_company_name, client_name, client_phone };
    });

  if (!isLoading) {
    const { data: cData } = data;
    clientData = sanitizeTableData(cData);
  }
  const clickHandle = () => {};
  const btnFunc = () => {};
  const tableHelperData = {
    actionColumnSrc: "/clients/viewclient/",
    actionColumnTitle: "Action",
    actionColumnValue: "View",
    actionColumnColor: "info",
    tableHeadRowData: ["id", "company", "name", "phone"],
    actionColumnButtonFunc: btnFunc,
  };

  return (
    <Main>
      <TitleSection>
        <TitleWrapper>
          <FontAwesomeIcon icon={faUsers} />
          <Title>Clients</Title>
        </TitleWrapper>
        <Link to="/clients/addclient">
          <Button label="success" clickHandle={() => {}}>
            Add New Client
          </Button>
        </Link>
      </TitleSection>
      <DetailSection>
        <SearchWrapper>
          <SearchBar>
            <Input type="text" placeholder="Search" />
            <Button label="info" clickHandle={() => {}}>
              Search
            </Button>
          </SearchBar>

          <SearchDesc></SearchDesc>
        </SearchWrapper>
        {!isLoading ? (
          <Table tableData={clientData} tableHelperData={tableHelperData} />
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
  margin: 2em;
  background-color: var(--white-color);
  color: black;
  border-radius: 4px;
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
