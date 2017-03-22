
const React = require('react')
import {AreaChart, Area, XAxis, YAxis, CartesianGrid, linearGradient, Tooltip, Legend} from 'Recharts';
const Formatting = require('./../../utils/Formatting')

const data = [
      {name: 'March', 'Portfolio Value': 10000},
      {name: 'May', 'Portfolio Value': 10033.85},
      {name: 'July', 'Portfolio Value': 10160},
      {name: 'September', 'Portfolio Value': 10313.39},
      {name: 'November', 'Portfolio Value': 10494.02},
      {name: 'January', 'Portfolio Value': 10711.16}
];

export default class TradesProjectedOutcomesAreaChart extends React.Component {
  render () {
  	return (
    	<AreaChart width={1100} height={300} data={data}
            margin={{top: 5, right: 20, left: 20, bottom: 5}}>
         <defs>
            <linearGradient id="henrysGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#4cd67d" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="#4cd67d" stopOpacity={0}/>
            </linearGradient>
         </defs>
         <XAxis dataKey="name"/>
         <YAxis tickFormatter={(d) => `$${Formatting.numberWithCommas(d)}  `} domain={[9990, 'auto']}/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip/>
         <Legend />
         <Area type="monotone" dataKey="Portfolio Value" stroke="#72f19f" fillOpacity={1} fill="url(#henrysGradient)" activeDot={{r: 8}} />
      </AreaChart>
    );
  }
}
