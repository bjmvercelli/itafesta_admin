import React from "react";
import { Doughnut } from "react-chartjs-2";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import { DoughnutOptions } from "../helpers/DoughnutOptions.js";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  chartContainer: {
    marginTop: theme.spacing(3),
    position: "relative",
    height: "300px",
  },
  stats: {
    marginTop: theme.spacing(2),
    display: "flex",
    justifyContent: "center",
  },
  status: {
    textAlign: "center",
    padding: theme.spacing(1),
  },
  title: {
    color: theme.palette.text.secondary,
    paddingBottom: theme.spacing(1),
  },
  statusIcon: {
    color: theme.palette.icon,
  },
}));

const DoughnutChart = (props) => {
  const { className, query, ...rest } = props;

  const classes = useStyles();
  const theme = useTheme();

  const COLORS_SERIES = [
    theme.palette.secondary.light,
    theme.palette.secondary.lighten,
    theme.palette.secondary.main,
  ];

  const arr = [
    { category: "Bolos", value: 30 },
    { category: "Doces", value: 10 },
    { category: "Outros", value: 70 },
  ]

  const data = {
    datasets: [
      {
        data: arr.map((status) => status.value),
        backgroundColor: COLORS_SERIES,
        borderWidth: 8,
        borderColor: theme.palette.white,
        hoverBorderColor: theme.palette.white,
      },
    ],
    labels: arr.map((status) => status.category),
  };

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardHeader title="Orders status" />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <Doughnut data={data} options={DoughnutOptions} />
        </div>
        <div className={classes.stats}>
          {arr.map((status) => (
            <div className={classes.status} key={status.category}>
              <Typography variant="body1" className={classes.title}>
                {status.category}
              </Typography>
              <Typography variant="h2">{status.value}%</Typography>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

DoughnutChart.propTypes = {
  className: PropTypes.string,
};

export default DoughnutChart;
