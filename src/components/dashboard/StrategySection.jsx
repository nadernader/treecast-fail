
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

const tickerBySymbol = (symbol) => {
  return window.TICKERS.filter(ticker => ticker.symbol == symbol)[0]
}

const today = () => {
  let date = new Date();
  return [date.getMonth()+1, date.getDate(), date.getFullYear()].join('/')
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
        ticker: tickerBySymbol('SNAP'),
        allocationPercentage: 20,
        allocationAmount: 20 * 100,
        fill: '#8884d8'
      },
      {
        ticker: tickerBySymbol('XOM'),
        allocationPercentage: 15,
        allocationAmount: 15 * 100,
        fill: '#83a6ed'
      },
      {
        ticker: tickerBySymbol('JNJ'),
        allocationPercentage: 17,
        allocationAmount: 17 * 100,
        fill: '#8dd1e1'
      },
      {
        ticker: tickerBySymbol('TLT'),
        allocationPercentage: 30,
        allocationAmount: 30 * 100,
        fill: '#82ca9d'
      },
      {
        ticker: tickerBySymbol('JPM'),
        allocationPercentage: 12,
        allocationAmount: 12 * 100,
        fill: '#a4de6c'
      },
      {
        ticker: tickerBySymbol('MMM'),
        allocationPercentage: 6,
        allocationAmount: 6 * 100,
        fill: '#d0ed57'
      }
    ]
    // next ffc658

    let trades = [
      {
        ticker: tickerBySymbol('SNAP'),
        buyDate: today(),
        sellDate: '9/18/2017',
        allocationAmount: 20 * 100
      },
      {
        ticker: tickerBySymbol('XOM'),
        buyDate: today(),
        sellDate: '9/7/2017',
        allocationAmount: 15 * 100
      },
      {
        ticker: tickerBySymbol('JNJ'),
        buyDate: today(),
        sellDate: '10/16/2017',
        allocationAmount: 17 * 100
      },
      {
        ticker: tickerBySymbol('JPM'),
        buyDate: today(),
        sellDate: '10/12/2017',
        allocationAmount: 12 * 100
      },
      {
        ticker: tickerBySymbol('MMM'),
        buyDate: today(),
        sellDate: '11/20/2017',
        allocationAmount: 6 * 100
      },
      {
        ticker: tickerBySymbol('TLT'),
        buyDate: today(),
        sellDate: '1/29/2018',
        allocationAmount: 30 * 100
      }
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
                <Item.Content verticalAlign='middle'>
                  <Button floated='right'>
                    <Icon name='plus'></Icon> Connect
                  </Button>
                  Robinhood
                </Item.Content>
              </Item>

              <Item>
                <Item.Image size='tiny' src={trade_schwab} />
                <Item.Content verticalAlign='middle'>
                  <Button floated='right'>
                    <Icon name='plus'></Icon> Connect
                  </Button>
                  Charles Schwab
                </Item.Content>
              </Item>

              <Item>
                <Item.Image size='tiny' src={trade_etrade} />
                <Item.Content verticalAlign='middle'>
                  <Button floated='right'>
                    <Icon name='plus'></Icon> Connect
                  </Button>
                  E-Trade
                </Item.Content>
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
                  <Statistic.Value>7.11%</Statistic.Value>
                  <Statistic.Label>Percentage Return</Statistic.Label>
                </Statistic>
                <Statistic>
                  <Statistic.Value>{'$' + Formatting.numberWithCommas(7.11 * 100) + '.00'}</Statistic.Value>
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
