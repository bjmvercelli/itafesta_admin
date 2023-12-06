import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import { BarOptions } from '../helpers/BarOptions.js';

const ChartRenderer = ({
  chartData,
}) => {
  
  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Valor total',
        // backgroundColor: '#FF6384',
        // borderColor: '#FF6384',
        // borderWidth: 1,
        // hoverBackgroundColor: '#FF6384',
        // hoverBorderColor: '#FF6384',
        data: chartData.data
      }
    ]
  };

  return (
    <Bar data={data} options={BarOptions} />
  )
};

ChartRenderer.propTypes = {
  chartData: PropTypes.object,
};
export default ChartRenderer;
