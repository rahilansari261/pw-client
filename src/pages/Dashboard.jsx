import styled from "styled-components";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useState } from "react";
import { Data } from "../util/Data";
import { BarChart, Table } from "../components/Index";
import useFetch from "../hooks/useFetch";

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
    {
      _id: "4",
      comapny: "Satyam Computers",
      name: "Satyam Kumar",
      phone: "9878642748",
    },
    {
      _id: "5",
      comapny: "Satyam Computers",
      name: "Satyam Kumar",
      phone: "9878642748",
    },
    {
      _id: "6",
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
    <Main>
      <ChartWrapper>
        <BarChart chartData={chartData}></BarChart>
      </ChartWrapper>
      <TwoTableWrapper>
        <Table tableData={clientData} tableHelperData={tableHelperData} />
        <Table tableData={clientData} tableHelperData={tableHelperData} />
      </TwoTableWrapper>
    </Main>
  );
};

const Main = styled.div`
overflow-y:auto;
  margin: 2em;
  background-color: white;
  color: black;
  border-radius: 4px;
  padding: 1em;
  padding-top:5em;
  @media (max-width: 550px) {
    margin: 0em;
    border-radius: 0px;
  }
`;
const ChartWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  /* overflow-x: auto; */
`;
const TwoTableWrapper = styled.div`
  display: flex;
  gap: 2em;
  @media (max-width: 550px) {
    flex-direction: column;
  }
`;
