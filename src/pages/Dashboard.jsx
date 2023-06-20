import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faFileInvoice, faFileInvoiceDollar } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { useEffect, useState } from "react";
import { Data } from "../util/Data";
import { BarChart, Button, Table } from "../components/Index";
import useFetch from "../hooks/useFetch";
import { Link, Outlet } from "react-router-dom";
import { LineWave } from "react-loader-spinner";
import { convertCurrencyToIndian } from "../util/helper";

Chart.register(CategoryScale);

export const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const { data: invoiceData, isLoading: isInvoiceLoading, error: invoiceError, fetchData: fetchInvoiceData } = useFetch();
  const { data: clientData, isLoading: isClientLoading, error: clientError, fetchData: fetchClientData } = useFetch();
  const { data: graphData, isLoading: isGraphLoading, error: graphError, fetchData: fetchGraphData } = useFetch();

  useEffect(() => {
    fetchInvoiceData(`invoices/1/3/All`);
    fetchClientData(`clients/1/3/All`);
    fetchGraphData(`users/sales/graph`);
  }, []);

  useEffect(() => {
    if (graphData !== null) {
      setChartData({
        labels: graphData.data.map((data) => data.month),
        datasets: [
          {
            label: "Sales Figure ",
            data: graphData.data.map((data) => convertCurrencyToIndian(data.stats).toString()),
            backgroundColor: ["rgb(82, 152, 158, 0.6)"],
          },
        ],
      });
    }
  }, [isGraphLoading]);

  const sanitizeTableDataForInvoice = (invoiceDataArray) =>
    invoiceDataArray.map((invoice) => {
      const { _id } = invoice;
      const { number, grand_total } = invoice.invoice_data;
      const { client_company_name } = invoice.client_data;
      return { _id, number, client_company_name, grand_total: convertCurrencyToIndian(grand_total) };
    });

  const sanitizeTableDataForClientBalance = (clientDataArray) =>
    clientDataArray.map((client) => {
      const { _id, client_company_name, client_balance } = client;
      return { _id, client_company_name, client_balance: convertCurrencyToIndian(client_balance) };
    });

  let invoiceTableData = null;
  let clientTableData = null;
  if (!isInvoiceLoading && !isClientLoading) {
    invoiceTableData = sanitizeTableDataForInvoice(invoiceData.data);
    clientTableData = sanitizeTableDataForClientBalance(clientData.data);
  }

  const clickHandle = () => {};
  const btnFunc = () => {};
  const tableHelperDataInvoice = {
    actionColumnSrc: "/invoices/viewinvoice/",
    actionColumnTitle: "Action",
    actionColumnValue: "View",
    actionColumnColor: "info",
    tableHeadRowData: ["id", "no", "company", "amount"],
    actionColumnButtonFunc: btnFunc,
  };

  const tableHelperDataClient = {
    actionColumnSrc: "/accounts/viewaccount/",
    actionColumnTitle: "Action",
    actionColumnValue: "View",
    actionColumnColor: "info",
    tableHeadRowData: ["id", "company ", "balance"],
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
          {chartData !== null ? (
            <BarChart chartData={chartData}></BarChart>
          ) : (
            <LineWave height="100" width="100" color="#003545" ariaLabel="line-wave" wrapperStyle={{}} wrapperClass="" visible={true} firstLineColor="" middleLineColor="" lastLineColor="" />
          )}
        </ChartWrapper>
      </Main>
      <TwoTableWrapper>
        <Main style={{ width: "100%" }}>
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
          <DetailSection>
            {invoiceTableData !== null ? (
              <Table tableData={invoiceTableData} tableHelperData={tableHelperDataInvoice} />
            ) : (
              <LineWave height="100" width="100" color="#003545" ariaLabel="line-wave" wrapperStyle={{}} wrapperClass="" visible={true} firstLineColor="" middleLineColor="" lastLineColor="" />
            )}
          </DetailSection>
        </Main>
        <Main style={{ width: "100%" }}>
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
          <DetailSection>
            {clientTableData !== null ? (
              <Table tableData={clientTableData} tableHelperData={tableHelperDataClient} />
            ) : (
              <LineWave height="100" width="100" color="#003545" ariaLabel="line-wave" wrapperStyle={{}} wrapperClass="" visible={true} firstLineColor="" middleLineColor="" lastLineColor="" />
            )}
          </DetailSection>
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
  position: relative;
  z-index: 0;

  @media (max-width: 550px) {
    margin: 0em 0em 2em;
    border-radius: 0px;
  }
`;
const DetailSection = styled.div`
  background-color: var(--white-color);
  padding: 1em;
  border-radius: 0 0 4px 4px;
  min-width: 100%;
  overflow-x: auto;
  margin: 0 auto;
`;
const ChartWrapper = styled.div`
  width: 100%;
  padding: 16px;
  margin: 0 auto;
  padding-top: 0px;
  @media (max-width: 550px) {
  }
`;
const TwoTableWrapper = styled.div`
  display: flex;
  @media (max-width: 550px) {
    gap: 1em;
    flex-direction: column;
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
