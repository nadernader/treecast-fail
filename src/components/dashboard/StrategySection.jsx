
const React = require('react')
import { Link } from 'react-router'
import { Modal, Item, Header, Segment, Button, Message, Icon, Table, Grid, Statistic, Divider } from 'semantic-ui-react'
require('./../../utils/Constants')
const Formatting = require('./../../utils/Formatting')
const TradesProjectedOutcomesLineChart = require('./TradesProjectedOutcomesLineChart')
const PortfolioPieChart = require('./PortfolioPieChart')

import trade_etrade from '../../images/trade_etrade.png';
import trade_robinhood from '../../images/trade_robinhood.png';
import trade_schwab from '../../images/trade_schwab.png';

const tickerById = (id) => {
  return window.TICKERS.filter(ticker => ticker.id == id)[0]
}

export default class StrategySection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      configureTradeDialog: false
    }
  }
  _configureTrade(e) {
    e && e.preventDefault()
    this.setState({configureTradeDialog: true})
  }
  render () {
    let portfolio = [
      {
        ticker: tickerById(8),
        allocationPercentage: 49.8,
        allocationAmount: 49.8 * 100,
        fill: '#0088FE'
      },
      {
        ticker: tickerById(23),
        allocationPercentage: 23.1,
        allocationAmount: 23.1 * 100,
        fill: '#FFBB28'
      },
      {
        ticker: tickerById(10),
        allocationPercentage: 15.3,
        allocationAmount: 15.3 * 100,
        fill: '#00C49F'
      },
      {
        ticker: tickerById(4),
        allocationPercentage: 11.8,
        allocationAmount: 11.8 * 100,
        fill: '#FF8042'
      }
    ]

    let trades = [
      {
        ticker: tickerById(8),
        buyDate: '3/20/2017',
        sellDate: '9/5/2017',
        allocationAmount: 49.8 * 100
      },
      {
        ticker: tickerById(23),
        buyDate: '3/20/2017',
        sellDate: '9/7/2017',
        allocationAmount: 23.1 * 100
      },
      {
        ticker: tickerById(10),
        buyDate: '3/22/2017',
        sellDate: '8/31/2017',
        allocationAmount: 15.3 * 100
      },
      {
        ticker: tickerById(4),
        buyDate: '3/20/2017',
        sellDate: '9/5/2017',
        allocationAmount: 11.8 * 100
      }
    ]
    let kpis = [
      {label: 'Estimated Return', value: '27.9%'},
      {label: 'Estimated Return', value: '$' + Formatting.numberWithCommas(27.9 * 100) + '.00'}
    ]
    let { configureTradeDialog } = this.state
    return (
      <div className='strategy-section'>
        <Modal open={configureTradeDialog} size='small'>
          <Header icon='exchange' content='Configure Trade' />
          <Modal.Content>
            <p>Please connect one of your trading accounts:</p>
            <Item.Group divided>
              <Item>
                <Item.Image size='tiny' src={trade_robinhood} />
                <Item.Content verticalAlign='middle'>Robinhood</Item.Content>
                <Item.Extra>
                  <Button floated='right'>
                    <Icon name='plus'></Icon> Connect
                  </Button>
                </Item.Extra>
              </Item>

              <Item>
                <Item.Image size='tiny' src={trade_schwab} />
                <Item.Content verticalAlign='middle'>Charles Schwab</Item.Content>
                <Item.Extra>
                  <Button floated='right'>
                    <Icon name='plus'></Icon> Connect
                  </Button>
                </Item.Extra>
              </Item>

              <Item>
                <Item.Image size='tiny' src={trade_etrade} />
                <Item.Content verticalAlign='middle'>TD Ameritrade</Item.Content>
                <Item.Extra>
                  <Button floated='right'>
                    <Icon name='plus'></Icon> Connect
                  </Button>
                </Item.Extra>
              </Item>
            </Item.Group>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => this.setState({configureTradeDialog: false})}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
        <h1>My Demo Strategy</h1>
        <p></p>
        <Divider hidden />
        <h3>Asset Diversification</h3>
        <Divider />
        <Grid>
          <Grid.Row columns={2}>
            <Grid.Column width={10}>
              <Divider hidden />
              <Divider hidden />
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Symbol</Table.HeaderCell>
                    <Table.HeaderCell>Name</Table.HeaderCell>
                    <Table.HeaderCell>Allocation (%)</Table.HeaderCell>
                    <Table.HeaderCell>Allocation ($)</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  { portfolio.map(item => {
                    return (
                      <Table.Row key={`asset-${item.ticker.id}`}>
                        <Table.Cell>{item.ticker.symbol}</Table.Cell>
                        <Table.Cell>{item.ticker.name}</Table.Cell>
                        <Table.Cell>{item.allocationPercentage}%</Table.Cell>
                        <Table.Cell>${Formatting.numberWithCommas(item.allocationAmount)}.00</Table.Cell>
                      </Table.Row>
                    )
                  }) }
                </Table.Body>
              </Table>
            </Grid.Column>
            <Grid.Column width={6}>
              <PortfolioPieChart data={portfolio}></PortfolioPieChart>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider hidden />
        <h3>Estimated Returns</h3>
        <Divider />
        <Divider hidden />
        <Grid>
          <Grid.Row columns={1}>
            <Grid.Column width={16}>
              <Statistic.Group widths='two'>
                <Statistic>
                  <Statistic.Value>27.9%</Statistic.Value>
                  <Statistic.Label>Percentage Return</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>{'$' + Formatting.numberWithCommas(27.9 * 100) + '.00'}</Statistic.Value>
                  <Statistic.Label>Absolute Return</Statistic.Label>
                </Statistic>
              </Statistic.Group>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={1}>
            <Grid.Column width={16}>
              <TradesProjectedOutcomesLineChart></TradesProjectedOutcomesLineChart>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Divider hidden />
        <h3>Recommended Trades</h3>
        <Divider />
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Symbol</Table.HeaderCell>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Buy Date</Table.HeaderCell>
              <Table.HeaderCell>Sell Date</Table.HeaderCell>
              <Table.HeaderCell>Allocation Amount ($)</Table.HeaderCell>
              <Table.HeaderCell>Actions</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            { trades.map(item => {
              return (
                <Table.Row key={`trade-${item.ticker.id}`}>
                  <Table.Cell>{item.ticker.symbol}</Table.Cell>
                  <Table.Cell>{item.ticker.name}</Table.Cell>
                  <Table.Cell>{item.buyDate}</Table.Cell>
                  <Table.Cell>{item.sellDate}</Table.Cell>
                  <Table.Cell>${Formatting.numberWithCommas(item.allocationAmount)}.00</Table.Cell>
                  <Table.Cell textAlign='center'>
                    <Button basic><Icon name='bell'></Icon>Set Alert</Button>
                    <Button basic onClick={(e) => this._configureTrade(e)}><Icon name='exchange'></Icon>Trade</Button>
                  </Table.Cell>
                </Table.Row>
              )
            }) }
          </Table.Body>
        </Table>
      </div>
    )
  }
}
