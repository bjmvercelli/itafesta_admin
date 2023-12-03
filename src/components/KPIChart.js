import React from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Card, CardContent, Grid, LinearProgress, Typography } from "@material-ui/core";
import CountUp from "react-countup";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  content: {
    alignItems: "center",
    display: "flex",
  },
  title: {
    fontWeight: 500,
  },
  progress: {
    marginTop: theme.spacing(3),
    height: "8px",
    borderRadius: "10px",
  },
  difference: {
    marginTop: theme.spacing(2),
    display: "flex",
    alignItems: "center",
  },
  differenceIcon: {
    color: theme.palette.error.dark,
  },
  differenceValue: {
    marginRight: theme.spacing(1),
  },
  green: {
    color: theme.palette.success.dark,
  },
  red: {
    color: theme.palette.error.dark,
  },
}));

const KPIChart = (props) => {
  const classes = useStyles();
  const { className, title, progress, query, difference, differenceValue, duration, ...rest } =
    props;


  const fullValue = 100;
  const value = (differenceValue / fullValue) * 100;

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              {title}
            </Typography>
            <Typography variant="h3">
              %
              <CountUp
                end={100}
                duration={duration}
                separator=","
                decimals={0}
              />
              %
            </Typography>
          </Grid>
        </Grid>
        {progress ? (
          <LinearProgress
            className={classes.progress}
            value={fullValue}
            variant="determinate"
          />
        ) : null}
        {difference ? (
          <div className={classes.difference}>
            <Typography className={classes.differenceValue} variant="body2">
              {value > 1 ? (
                <span className={classes.green}>{value.toFixed(1)}%</span>
              ) : (
                <span className={classes.red}>{value.toFixed(1)}%</span>
              )}
            </Typography>
            <Typography className={classes.caption} variant="caption">
              Since this year
            </Typography>
          </div>
        ) : null}
      </CardContent>
    </Card>
  );
};

KPIChart.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
};

export default KPIChart;
