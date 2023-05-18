import { Link, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { Button, Pagination, Table } from "../../components/Index";
import useFetch from "../../hooks/useFetch";

export const ProductList = () => {
  // const productData = [
  //   {
  //     _id: "1",
  //     name: "LG Monitor",
  //     code: "13324",
  //     price: 15000,
  //     tax: "gst@18",
  //   },
  //   {
  //     _id: "2",
  //     name: "LG Monitor",
  //     code: "13324",
  //     price: 15000,
  //     tax: "gst@18",
  //   },
  // ];

  const { data, isLoading, error } = useFetch(
    "https://pw-backend.onrender.com/api/v1/products/1/10/All"
  );
  let productData;
  if (!isLoading) {
    const { data: pData } = data;

    productData = pData.map((product) => {
      const { product_description, product_status, product_unit, ...rest } =
        product;
      const p_tax = `${product.product_tax.type}@${product.product_tax.rate}`;

      const {
        _id,
        product_name,
        product_code,
        product_price,
        p_tax: product_tax,
      } = {
        ...rest,
        p_tax,
      };

      return {
        _id,
        product_name,
        product_code,
        product_price,
        product_tax,
      };
    });
  }

  const btnFunc = () => {};

  const tableHelperData = {
    actionColumnSrc: "/products/viewproduct/",
    actionColumnTitle: "Action",
    actionColumnValue: "View",
    actionColumnColor: "info",
    tableHeadRowData: ["id", "name", "code", "price", "tax"],
    actionColumnButtonFunc: btnFunc,
  };

  const handleSearch = () => {};

  return (
    !isLoading && (
      <Main>
        <TitleSection>
          <TitleWrapper>
            <FontAwesomeIcon icon={faBagShopping} />
            <Title>Products</Title>
          </TitleWrapper>
          <Link to="/products/addproduct">
            <Button label="success" clickHandle={() => {}}>
              Add New Product
            </Button>
          </Link>
        </TitleSection>
        <DetailSection>
          <SearchWrapper>
            <SearchBar>
              <Input type="text" placeholder="Search" />
              <Button label="info" clickHandle={handleSearch}>
                Search
              </Button>
            </SearchBar>

            <SearchDesc> </SearchDesc>
          </SearchWrapper>
          <Table tableData={productData} tableHelperData={tableHelperData} />
          <Pagination />
        </DetailSection>
        <Outlet />
      </Main>
    )
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
  max-width: 1000px;
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
