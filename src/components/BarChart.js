import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Divider } from '@material-ui/core';
import BarChartHeader from './BarChartHeader';
import ChartRenderer from './ChartRenderer';

const useStyles = makeStyles(() => ({
  root: {},
  chartContainer: {
    position: 'relative',
    padding: '19px 0',
  },
}));

const BarChart = (props) => {
  const { className, chartData, ...rest } = props;
  const classes = useStyles();

  return (
    <Card {...rest} className={clsx(classes.root, className)}>
      <BarChartHeader />
      <Divider />
      <CardContent>
        <div className={classes.chartContainer}>
          <ChartRenderer
            chartData={chartData}
          />
        </div>
      </CardContent>
    </Card>
  );
};

BarChart.propTypes = {
  className: PropTypes.string,
};

export default BarChart;
