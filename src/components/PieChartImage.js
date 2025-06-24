import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

Chart.register(PieController, ArcElement, Tooltip, Legend, ChartDataLabels);

const PieChartImage = (Top5) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = 1400; 
    canvas.height = 700; 
    const ctx = canvas.getContext('2d');

    const dataArray = Array.isArray(Top5) ? Top5 : Object.values(Top5);
    const labels = dataArray.map(item => item.label);
    const values = dataArray.map(item => parseInt(item.value || 0, 10));
    const backgroundColors = ['#cd853f', '#a0522d', '#d2691e', '#964b00', '#8b4513'];

    new Chart(ctx, {
      type: 'pie',
      data: {
        labels,
        datasets: [{
          data: values,
          backgroundColor: backgroundColors
        }]
      },
      options: {
        responsive: false,
        animation: false,
        layout: {
          padding: {
            top: 80,
            bottom: 80,
            left: 100,
            right: 100
          }
        },
        plugins: {
          legend: {
            display: false
          },
          datalabels: {
            color: '#000',
            font: {
              size: 18,
              weight: 'bold'
            },
            align: 'end',
            anchor: 'end',
            offset: 14,
            clip: false,
            formatter: (value, context) => {
              const label = context.chart.data.labels[context.dataIndex];
              const total = context.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
              const percent = ((value / total) * 100).toFixed(0);
              return `${label}: ${percent}%`;
            }
          }
        }
      },
      plugins: [
        {
          id: 'done',
          afterDraw: () => {
            const imgData = canvas.toDataURL('image/png');
            resolve(imgData);
          }
        }
      ]
    });
  });
};

export default PieChartImage;
