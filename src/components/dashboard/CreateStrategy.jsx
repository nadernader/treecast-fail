
const React = require('react')
import { Link } from 'react-router'
import { Form, Button, Message, Icon, Segment, Checkbox, Divider, Dropdown } from 'semantic-ui-react'
const ReactSlider = require('react-slider')
const Api = require('./../../utils/Api')
//import TICKERS from './../../utils/Constants'
require('./../../utils/Constants')

const optionize = (label) => {
  return {
    key: label,
    text: label,
    value: label
  }
}

export default class CreateStrategy extends React.Component {
  create(e) {
    e && e.preventDefault()
    window.strategyCreated = true
    this.props.history.pushState(null, `/home`);
  }
  render () {
    let timelineOptions = [
      '1 day - 1 week',
      '1 week - 1 month',
      '1-3 months',
      '4-6 months',
      '7-12 months'
    ].map(optionize)
    let riskOptions = ['Low', 'Medium', 'High'].map(label => {
      return {
        key: label,
        text: label,
        value: label
      }
    })
    let tickerOptions = window.TICKERS.map(ticker => {
      return {
        key: ticker.symbol,
        text: `${ticker.symbol} - ${ticker.name}`,
        value: ticker.symbol
      }
    })

    let familiarIndexesOptions = tickerOptions

    let marketTypeOptions = ['Developed', 'Emerging'].map(optionize)
    let developedMarketLocationOptions = ['United Kingdom', 'USA', 'Canada', 'France', 'Switzerland', 'Belgium', 'Hong Kong', 'South Korea'].map(optionize)
    let emergingMarketLocationOptions = ['Argentina', 'Mexico', 'Brazil', 'Chile', 'New Zealand', 'Indonesia', 'Singapore', 'India', 'Malaysia', 'China'].map(optionize)
    let assetSubClassOptions = ['Small Cap', 'Large Cap', 'Mid Cap', 'MicroCap', 'US', 'Foreign Developed', 'Foreign Emerging'].map(optionize)
    return (
      <div className='home-section'>
        <h2>Create Strategy</h2>
        <Form onSubmit={(e) => this.create(e)}>
          <Divider hidden />
          <h4>My Assets</h4>
          <Divider />
          <Form.Field inline>
            <label>I want to invest</label>
            <input placeholder='' />
          </Form.Field>

          <Divider hidden />
          <h4>Assets I'm interested in</h4>
          <Divider />
          <Form.Field inline>
            <label>Market Type</label>
            <Dropdown placeholder='' selection multiple options={marketTypeOptions} />
          </Form.Field>
          <Form.Field inline>
            <label>Market Location</label>
            <Dropdown placeholder='' selection multiple options={developedMarketLocationOptions} />
          </Form.Field>
          <Form.Field inline>
            <label>Indexes I want in My Strategy</label>
            <Dropdown className='symbol-selector' placeholder='' selection multiple options={familiarIndexesOptions} />
          </Form.Field>

          <Divider hidden />
          <h4>Strategy Settings</h4>
          <Divider />
          <Form.Field inline>
            <label>Estimated Timeline</label>
            <Dropdown placeholder='' selection options={timelineOptions} />
          </Form.Field>
          <Form.Field inline>
            <label>Risk/Reward Scale</label>
            <Dropdown placeholder='' selection options={riskOptions} />
          </Form.Field>
          <Form.Field inline>
            <label>Strategy Name</label>
            <input placeholder='' />
          </Form.Field>

          <Divider hidden />
          <Form.Field>
            <Checkbox label='I agree to the Terms and Conditions' />
          </Form.Field>
          <Button type='submit' primary>
            Save
          </Button>
          &nbsp;<Link to='/home'>Cancel</Link>
        </Form>
      </div>
    )
  }
}
