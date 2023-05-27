import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faFileInvoice, faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Data } from "../util/Data";
import { BarChart, Button, Table } from "../components/Index";
import useFetch from "../hooks/useFetch";
import { Link, Outlet } from "react-router-dom";

Chart.register(CategoryScale);

export const Dashboard = () => {
  // const { data, isLoading, error } = useFetch(
  //   "https://pw-backend.onrender.com/api/v1/invoices/"
  // );
  // const { data, isLoading, error } = useFetch(
  //   "https://pw-backend.onrender.com/api/v1/users/hello"
  // );
  // const { data, isLoading, error } = useFetch(
  //   "https://pw-backend.onrender.com/api/v1/users/hello"
  // );

  // console.log(data);
  const [chartData, setChartData] = useState({
    labels: Data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained ",
        data: Data.map((data) => data.userGain),
        backgroundColor: ["rgba(75,192,192,1)", "#ecf0f1", "#50AF95", "#f3ba2f", "#2a71d0"],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  const clientData = [
    {
      _id: "1",
      comapny: "Satyam Computers",
      name: "Satyam Kumar",
      phone: "9878642748",
    },
    {
      _id: "2",
      comapny: "Satyam Computers",
      name: "Satyam Kumar",
      phone: "9878642748",
    },
    {
      _id: "3",
      comapny: "Satyam Computers",
      name: "Satyam Kumar",
      phone: "9878642748",
    },
  ];
  const clickHandle = () => {};
  const btnFunc = () => {};
  const tableHelperData = {
    actionColumnSrc: "/clients/viewclient/",
    actionColumnTitle: "Action",
    actionColumnValue: "View",
    actionColumnColor: "info",
    tableHeadRowData: Object.keys(clientData[0]),
    actionColumnButtonFunc: btnFunc,
  };

  return (
    <>
      <Main>
        <TitleSection>
          <TitleWrapper>
            <FontAwesomeIcon icon={faChartLine} />
            <Title>Sales Report</Title>
          </TitleWrapper>
        </TitleSection>

        <ChartWrapper>
          <BarChart chartData={chartData}></BarChart>
        </ChartWrapper>
      </Main>
      <TwoTableWrapper>
        <Main>
          <TitleSection>
            <TitleWrapper>
              <FontAwesomeIcon icon={faFileInvoiceDollar} />
              <Title>Recent Invoices</Title>
            </TitleWrapper>
            <ButtonWrapper>
              <Link to="/invoices/addinvoice">
                <Button label="success" clickHandle={() => {}}>
                  Add New Invoice
                </Button>
              </Link>
              <Link to="/invoices/invoicelist">
                <Button label="primary" clickHandle={() => {}}>
                  See All
                </Button>
              </Link>
            </ButtonWrapper>
          </TitleSection>
          <Table tableData={clientData} tableHelperData={tableHelperData} />
        </Main>
        <Main>
          <TitleSection>
            <TitleWrapper>
              <FontAwesomeIcon icon={faFileInvoice} />
              <Title>Client Balances</Title>
            </TitleWrapper>
            <ButtonWrapper>
              <Link to="/accounts">
                <Button label="primary" clickHandle={() => {}}>
                  See All
                </Button>
              </Link>
            </ButtonWrapper>
          </TitleSection>
          <Table tableData={clientData} tableHelperData={tableHelperData} />
        </Main>
      </TwoTableWrapper>
    </>
  );
};

const Main = styled.div`
  overflow-y: auto;
  margin: 2em 2em 0.5em 2em;
  background-color: white;
  color: black;
  border-radius: 4px;
  @media (max-width: 550px) {
    margin: 0em 0em 2em;
    border-radius: 0px;
    
  }
`;
const ChartWrapper = styled.div`
  width: 65%;
  margin: 0 auto;
  @media (max-width: 550px) {
    width: 100%;
  }
`;
const TwoTableWrapper = styled.div`
  display: flex;
  @media (max-width: 550px) {
    gap: 1em;
    flex-direction: column;
    padding: 1em;
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
const Title = styled.div`
  padding-left: 8px;
  font-family: "Cabin-bold";
`;

const TitleWrapper = styled.div`
  display: flex;
`;
const ButtonWrapper = styled.div`
  display: flex;
  gap: 4px;
`;
