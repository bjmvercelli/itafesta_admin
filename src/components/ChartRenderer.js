import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import { BarOptions } from '../helpers/BarOptions.js';

const lastFiveDays = () => {
  const dates = [];
  for (let i = 0; i < 5; i++) {
    dates.push(moment().subtract(i, 'days').format('DD/MM/YYYY'));
  }
  return dates;
};

const TypeToChartComponent = {
  bar: ({ resultSet }) => {
    const data = {
      labels: lastFiveDays(),
      datasets: [

      ]
    };
    return <Bar data={data} options={BarOptions} />;
  },
};
const TypeToMemoChartComponent = Object.keys(TypeToChartComponent)
  .map((key) => ({
    [key]: React.memo(TypeToChartComponent[key]),
  }))
  .reduce((a, b) => ({ ...a, ...b }));

const renderChart = (Component) => ({ resultSet = [], error, ...props }) =>
  (resultSet && <Component resultSet={resultSet} {...props} />)

const ChartRenderer = ({ vizState = {} }) => {
  const { query, chartType, ...options } = vizState;
  const component = TypeToMemoChartComponent[chartType];
  return component && renderChart(component)({ ...options });
};

ChartRenderer.propTypes = {
  vizState: PropTypes.object,
};
export default ChartRenderer;
