import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faUsers, faBagShopping, faGears, faFileInvoiceDollar, faFileInvoice } from "@fortawesome/free-solid-svg-icons";
const listItems = [
  {
    id: "1",
    title: "Dashboard",
    link: "/",
    icon: <FontAwesomeIcon icon={faChartLine} />,
  },

  {
    id: "2",
    title: "Products",
    link: "/products",
    icon: <FontAwesomeIcon icon={faBagShopping} />,
  },
  {
    id: "3",
    title: "Clients",
    link: "/clients",
    icon: <FontAwesomeIcon icon={faUsers} />,
  },

  {
    id: "4",
    title: "Invoices",
    link: "/invoices",
    icon: <FontAwesomeIcon icon={faFileInvoiceDollar} />,
  },
  {
    id: "5",
    title: "Accounts",
    link: "/accounts",
    icon: <FontAwesomeIcon icon={faFileInvoice} />,
  },

  {
    id: "6",
    title: "Settings",
    link: "/settings",
    icon: <FontAwesomeIcon icon={faGears} />,
  },
];

export default listItems;
