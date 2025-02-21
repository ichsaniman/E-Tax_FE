import React from "react";
import Chart from "react-apexcharts";

const BarChart = ({ data, title, height, width }) => {
  // const options = {
  //   chart: {
  //     type: 'bar',
  //     toolbar: {
  //       show: true,
  //     },
  //   },
  //   title: {
  //     text: title,
  //     align: 'center',
  //   },
  //   plotOptions: {
  //     bar: {
  //       horizontal: false,
  //       borderRadius: 10,
  //       borderRadiusApplication: 'end',
  //     },
  //   },
  //   dataLabels: {
  //     enabled: true,
  //     style: {
  //       colors: ['#000000'], // Set the color to black
  //     },
  //   },
  //   xaxis: {
  //     categories: data.map(item => item.name),
  //     labels: {
  //       style: {
  //         colors: '#333',
  //         fontSize: '12px',
  //       },
  //     },
  //   },
  //   yaxis: {
  //     title: {
  //       text: 'Values',
  //       style: {
  //         color: '#333',
  //         fontSize: '14px',
  //       },
  //     },
  //     labels: {
  //       style: {
  //         colors: '#333',
  //       },
  //     },
  //   },
  //   tooltip: {
  //     style: {
  //       fontSize: '14px',
  //       color: '#000',
  //     },
  //   },
  // };
  var options = {
    // series: [
    //   {
    //     name: "Net Profit",
    //     data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
    //   },
    //   {
    //     name: "Revenue",
    //     data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    //   },
    //   {
    //     name: "Free Cash Flow",
    //     data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    //   },
    // ],
    // chart: {
    //   type: "bar",
    //   height: 350,
    // },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "70%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    // yaxis: {
    //   title: {
    //     text: "$ (thousands)",
    //   },
    // },
    fill: {
      opacity: 1,
    },
    // tooltip: {
    //   y: {
    //     formatter: function (val) {
    //       return "$ " + val + " thousands";
    //     },
    //   },
    // },
  };

  // const series = [
  //   {
  //     name: "Task Status",
  //     data: data.map((item) => item.data), // Array of numbers
  //   },
  // ];

  const series = [
    {
      name: "Generated",
      data: [
        1000, 2000, 2000, 4000, 1500, 3000, 3000, 3000, 5000, 6000, 8000, 8000,
      ],
    },
    {
      name: "Sent",
      data: [
        1000, 2000, 2000, 4000, 1500, 3000, 3000, 3000, 5000, 6000, 8000, 8000,
      ],
    },
    // {
    //   name: "Free Cash Flow",
    //   data: [35, 41, 36, 26, 45, 48, 52, 53, 41],
    // },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={height}
      width={width}
    />
  );
};

export default BarChart;
