'use client';

import React from 'react';
import { Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';

const ChartDisplay = ({ chartData }) => {
  return (
    chartData && (
      <div>
        <Typography variant="h4" gutterBottom>
          {chartData.labels[0]} Chart
        </Typography>
        <Bar data={chartData} />
      </div>
    )
  );
};

export default ChartDisplay;
