import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import KPIChart from "../components/KPIChart";
import BarChart from "../components/BarChart.js";
import DoughnutChart from "../components/DoughnutChart.js";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min.js";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4),
  },
}));

const cards = [
  {
    title: "Pedidos",
    query: "totalOrders",
    // difference: "Orders",
    // differenceValue: 25,
    duration: 1.25,
  },
  {
    title: "Total de usuários",
    query: "totalUsers",
    // difference: "Users",
    // differenceValue: 15,
    duration: 1.5,
  },
  {
    title: "Total de fornecedores",
    query: "totalSuppliers",
    duration: 1.75,
  },
  {
    title: "Valor total em vendas",
    query: "totalValue",
    duration: 2.25,
  },
];

const getLastFiveDays = () => {
  const dates = [];
  for (let i = 0; i < 5; i++) {
    dates.push(moment().subtract(i, "days").format("DD/MM/YYYY"));
  }
  return dates;
};

const Dashboard = () => {
  const classes = useStyles();
  const history = useHistory();

  const [isLoading, setIsLoading] = React.useState(true);
  const [kpisData, setKpisData] = React.useState([]);
  const [donutData, setDonutData] = React.useState([]);
  const [chartData, setChartData] = React.useState({});

  const fetchOrders = async () => {
    const response = await fetch(
      "https://redes-8ac53ee07f0c.herokuapp.com/api/v1/pedidos"
    );

    const responseData = await response.json();

    const totalOrders = responseData.data.length;
    const totalValue = responseData.data.reduce((acc, cur) => {
      return acc + parseFloat(cur.valor_total);
    }, 0);

    const lastFiveDays = getLastFiveDays();

    const sellsPerDay = lastFiveDays.map((day) => {
      const orders = responseData.data.filter((item) => {
        return item.data === day;
      });

      const total = orders.reduce((acc, cur) => {
        return acc + parseFloat(cur.valor_total);
      }, 0);

      return total.toFixed(2);
    });

    return {
      totalOrders,
      totalValue: totalValue.toFixed(2),
      chartInfo: {
        labels: lastFiveDays,
        data: sellsPerDay,
      }
    };
  };

  const fetchUsers = async () => {
    const response = await fetch(
      "https://redes-8ac53ee07f0c.herokuapp.com/api/v1/clientes"
    );

    const responseData = await response.json();

    const totalUsers = responseData.data.length;

    return {
      totalUsers,
    };
  };

  const fetchSuppliers = async () => {
    const response = await fetch(
      "https://redes-8ac53ee07f0c.herokuapp.com/api/v1/fornecedores"
    );

    const responseData = await response.json();

    const totalSuppliers = responseData.data.length;
    const allTypes = responseData.data.map((item) => item.tipo);

    const countByType = allTypes.reduce((acc, cur) => {
      acc[cur] = (acc[cur] || 0) + 1;
      return acc;
    }, {});

    return {
      totalSuppliers,
      countByType,
    };
  };

  useEffect(() => {
    const login = localStorage.getItem("login");
    if (!login) {
      history.push("/login");
    }

    setIsLoading(true);

    const promises = [fetchOrders(), fetchUsers(), fetchSuppliers()];

    Promise.all(promises).then((values) => {
      const orders = values[0];
      const users = values[1];
      const suppliers = values[2];

      setKpisData({
        totalOrders: orders.totalOrders,
        totalValue: orders.totalValue,
        totalUsers: users.totalUsers,
        totalSuppliers: suppliers.totalSuppliers,
      });

      setDonutData(
        Object.entries(suppliers.countByType).map(([key, value]) => {
          return {
            category: key?.toUpperCase(),
            value,
          };
        })
      );

      setChartData({
        labels: orders.chartInfo.labels,
        data: orders.chartInfo.data,
      });

      setIsLoading(false);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        {cards.map((item, index) => {
          return (
            <Grid key={item.title + index} item lg={3} sm={6} xl={3} xs={12}>
              <KPIChart {...item} ordersData={kpisData} isLoading={isLoading} />
            </Grid>
          );
        })}
        <Grid item lg={8} md={12} xl={9} xs={12}>
          <BarChart chartData={chartData} />
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          <DoughnutChart donutData={donutData} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
