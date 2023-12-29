import React from 'react';
import moment from 'moment-timezone';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';

import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function generateHourLabels() {
    const hourLabels = [];
    for (let i = 1; i <= 24; i ++) {
      let formattedHour = i.toString().padStart(2, '0');
      if (formattedHour === '24') {
        formattedHour = '00';
      }
      hourLabels.push(`${formattedHour}:00`);
    }
    return hourLabels;
  }
  function getDayLabelsBetweenDates(start_date, end_date) {
    // Set the timezone to 'Asia/Ho_Chi_Minh' (Vietnam timezone)
    moment.tz.setDefault('Asia/Ho_Chi_Minh');
  
    const startDay = moment(start_date);
    const endDay = moment(end_date);
  
    // Ensure start_date is before or equal to end_date
    if (!startDay.isSameOrBefore(endDay)) {
      throw new Error('start_date must be before or equal to end_date');
    }
  
    const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
    // Create an array of labels for the days from start_date to end_date
    const weekDayLabels = [];
    let currentDay = startDay.clone();
  
    while (currentDay.isSameOrBefore(endDay)) {
      const currentIndex = currentDay.day();
      weekDayLabels.push(dayLabels[currentIndex]);
      currentDay.add(1, 'day');
    }
  
    return weekDayLabels;
  }

  function getDaysInCurrentMonth() {
    // Set the timezone to 'Asia/Ho_Chi_Minh' (Vietnam timezone)
    moment.tz.setDefault('Asia/Ho_Chi_Minh');
  
    const today = moment();
    const daysInMonth = today.daysInMonth();
  
    const dayLabels = [];
    for (let day = 1; day <= daysInMonth; day++) {
      dayLabels.push(day);
    }
  
    return dayLabels;
  }
function getLast12Months() {
    // Set the timezone to 'Asia/Ho_Chi_Minh' (Vietnam timezone)
    moment.tz.setDefault('Asia/Ho_Chi_Minh');
  
    const today = moment();
    const last12Months = [];
  
    for (let i = 0; i < 12; i++) {
      const currentMonth = today.clone().subtract(i, 'months');
      last12Months.push(currentMonth.format('MMMM YYYY'));
    }
  
    return last12Months.reverse();
  }
const hourLabels = generateHourLabels();

const dayOfWeekCurrentLabels = getDayLabelsBetweenDates('2023-12-22', '2023-12-28');
// console.log("dayOfWeekCurrentLabels", dayOfWeekCurrentLabels);
const dayOfMonthCurrentLabels = getDaysInCurrentMonth();
console.log("dayOfMonthCurrentLabels", dayOfMonthCurrentLabels);
const monthOfYearCurrentLabels = getLast12Months();



const LineChart = ({externalData, timeRange} ) => {
  let labels = dayOfMonthCurrentLabels;
  if (timeRange === 3) {
    labels = dayOfMonthCurrentLabels;
  }
  console.log("timeRange", timeRange);
  console.log("externalData", externalData);
  const dataTest = externalData.map(item => (item !== null ? item.energy : null));
  console.log("dataTest", dataTest);
    // const labels = ['T7', 'T4', 'T5', 'T2', 'T1', 'T2', 'T1', 'T2', 'T1', 'T2', 'T1', 'T2', 'T1', 'T2', 'T1', 'T2', 'T1', 'T2', 
    //                         'T1', 'T2', 'T1', 'T2', 'T1', 'T2', 'T1', 'T2', 'T1', 'T2', 'T1', 'T2', 'T1', 'T2',
    //                         'T1', 'T2', 'T1', 'T2', 'T1', 'T2', 'T1', 'T2', 'T1', 'T2', 'T1', 'T2', 'T1', 'T2', 'T1', 'T2', 'T1', 'T2', 
    //                         'T1', 'T2', 'T1', 'T2', 'T1', 'T2', 'T1', 'T2', 'T1', 'T3', 'T4', 'T6', 'T7', 'T9']

    const data = {
    labels: labels,
    datasets: [{
        label: 'My First Dataset',
        // data: [65, 59, 80 - null, null, null, 55, 40],
        data: dataTest,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
    }]
    };
    const config = {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: 'category',
                    beginAtZero: true,
                },
                y: {
                    beginAtZero: true,
                },
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
            },
        },
    };

    return(
        <Line {...config}/>
    )
}

export default LineChart;