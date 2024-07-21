import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, axisClasses } from '@mui/x-charts';
import Title from './Title';
import axios from 'axios';

// Generate Sales Data
function createData(time, amount) {
  return { time, amount: amount ?? null };
}

export default function Chart() {
  const theme = useTheme();
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    // Fetch data from API
    async function fetchData() {
      try {
        const response = await axios.get('https://localhost:7251/api/Orders');
        const orders = response.data;

        // Process the orders to get the total price per day for the last 10 days
        const today = new Date();
        const past10Days = Array.from({ length: 10 }, (_, i) => {
          const date = new Date();
          date.setDate(today.getDate() - i);
          return date.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
        });

        const totalPriceByDay = past10Days.map(date => {
          const dayOrders = orders.filter(order => order.orderDate === date);
          const totalPrice = dayOrders.reduce((sum, order) => sum + order.totalPrice, 0);
          return createData(date, totalPrice);
        });

        setData(totalPriceByDay.reverse()); // Reverse to have the oldest date first
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <React.Fragment>
      <Title>Sales for the Last 10 Days</Title>
      <div style={{ width: '100%', flexGrow: 1, overflow: 'hidden' }}>
        <LineChart
          dataset={data}
          margin={{
            top: 16,
            right: 20,
            left: 70,
            bottom: 30,
          }}
          xAxis={[
            {
              scaleType: 'point',
              dataKey: 'time',
              tickNumber: 2,
              tickLabelStyle: theme.typography.body2,
            },
          ]}
          
          series={[
            {
              dataKey: 'amount',
              showMark: false,
              color: '#FF0000', // Golden Yellow
            },
          ]}
          sx={{
            [`.${axisClasses.root} line`]: { stroke: theme.palette.text.secondary },
            [`.${axisClasses.root} text`]: { fill: theme.palette.text.secondary },
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-25px)',
            },
          }}
        />
      </div>
    </React.Fragment>
  );
}
