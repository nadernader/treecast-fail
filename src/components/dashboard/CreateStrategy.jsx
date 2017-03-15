
const React = require('react')
import { Link } from 'react-router'
import { Form, Button, Message, Icon, Segment, Checkbox, Divider, Dropdown } from 'semantic-ui-react'
const ReactSlider = require('react-slider')
const Api = require('./../../utils/Api')
//import TICKERS from './../../utils/Constants'
require('./../../utils/Constants')


export default class CreateStrategy extends React.Component {
  create(e) {
    e && e.preventDefault()
    window.strategyCreated = true
  }
  render () {
    let timelineOptions = ['1 day', '1 week', '1 month', '3 months', '6 months', '9 months', '1 year', '2 years', '5 years', '10 years', '25 years', '50 years'].map(label => {
      return {
        key: label,
        text: label,
        value: label
      }
    })
    let riskOptions = ['Low', 'Medium', 'High'].map(label => {
      return {
        key: label,
        text: label,
        value: label
      }
    })
    let tickerOptions = window.TICKERS.slice(100, 300).map(ticker => {
      return {
        key: ticker.Symbol,
        text: `$${ticker.Symbol} - ${ticker.Name}`,
        value: ticker.Symbol
      }
    })

    let assetClassOptions = ['Equities', 'Fixed Income', 'Cash/Currency'].map(label => {
      return {
        key: label,
        text: label,
        value: label
      }
    })
    let assetSubClassOptions = ['Small Cap', 'Large Cap', 'Mid Cap', 'MicroCap', 'US', 'Foreign Developed', 'Foreign Emerging'].map(label => {
      return {
        key: label,
        text: label,
        value: label
      }
    })
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
          <Form.Field inline>
            <label>Assets I currently own</label>
            <Dropdown className='asset-list' placeholder='' search selection multiple options={tickerOptions} />
          </Form.Field>

          <Divider hidden />
          <h4>Assets I'm interested in</h4>
          <Divider />
          <Form.Field inline>
            <label>Asset Class</label>
            <Dropdown placeholder='' selection options={assetClassOptions} />
          </Form.Field>
          <Form.Field inline>
            <label>Asset Sub-Class</label>
            <Dropdown placeholder='' selection options={assetSubClassOptions} />
          </Form.Field>

          <Divider hidden />
          <h4>Strategy Settings</h4>
          <Divider />
          <Form.Field inline>
            <label>Timeline</label>
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
