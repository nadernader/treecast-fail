
const React = require('react')
import { PieChart, Pie, Sector } from 'Recharts';
const Formatting = require('./../../utils/Formatting')

/*
const data = [
  {name: 'Group A', value: 400, fill: '#0088FE'},
  {name: 'Group B', value: 300, fill: '#00C49F'},
  {name: 'Group C', value: 300, fill: '#FFBB28'},
  {name: 'Group D', value: 200, fill: '#FF8042'}
];*/
const data = [{"name":"SNAP","value":2000,"fill":"#8884d8"},{"name":"XOM","value":1500,"fill":"#83a6ed"},{"name":"JNJ","value":1700,"fill":"#8dd1e1"},{"name":"TLT","value":3000,"fill":"#82ca9d"},{"name":"JPM","value":1200,"fill":"#a4de6c"},{"name":"MMM","value":600,"fill":"#d0ed57"}]

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';
  const str = Formatting.numberWithCommas(value)
  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={payload.fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={payload.fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none"/>
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none"/>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`$${str}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};

export default class StrategySection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeIndex: 0
    }
  }

  onPieEnter(data, index) {
    this.setState({
      activeIndex: index,
    });
  }

	render () {
    /*
    let i = 0;
    let data = this.props.data.map(item => {
      return {
        name: item.ticker.symbol,
        value: item.allocationAmount,
        fill: item.fill
      }
    })
    console.log('data', JSON.stringify(data))
    */
    return (
    	<PieChart width={400} height={300} onMouseEnter={(data, index) => this.onPieEnter(data, index)}>
        <Pie
        	activeIndex={this.state.activeIndex}
          activeShape={renderActiveShape}
          data={data}
          cx={200}
          cy={150}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8" />
       </PieChart>
    );
  }
}
