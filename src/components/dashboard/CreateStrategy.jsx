
const React = require('react')
import { Link } from 'react-router'
import { Form, Button, Message, Icon, Segment, Checkbox, Divider, Dropdown, Step, Label, Input, Progress } from 'semantic-ui-react'
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
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      progress: 0
    }
  }
  create(e) {
    e && e.preventDefault()
    let { step, progress } = this.state
    step++
    progress = 10
    this.setState({ step, progress })
    let loadingDone = false
    let interval = setInterval(() => {
      progress = this.state.progress
      progress += 4
      this.setState({progress})
      if (progress >= 90) {
        progress = 100
        this.setState({progress})
        clearInterval(interval)
        loadingDone = true
        setTimeout(() => {
          window.strategyCreated = true
          this.props.history.pushState(null, `/strategies/1`);
        }, 500)
      }
    }, 50)
  }
  next(e) {
    e && e.preventDefault()
    let { step } = this.state
    step++
    this.setState({ step })
  }
  render () {
    let { step, progress } = this.state
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
/*
    let marketTypeOptions = ['Developed', 'Emerging'].map(optionize)
    let developedMarketLocationOptions = ['United Kingdom', 'USA', 'Canada', 'France', 'Switzerland', 'Belgium', 'Hong Kong', 'South Korea'].map(optionize)
    let emergingMarketLocationOptions = ['Argentina', 'Mexico', 'Brazil', 'Chile', 'New Zealand', 'Indonesia', 'Singapore', 'India', 'Malaysia', 'China'].map(optionize)
    let assetSubClassOptions = ['Small Cap', 'Large Cap', 'Mid Cap', 'MicroCap', 'US', 'Foreign Developed', 'Foreign Emerging'].map(optionize)
*/
    let interestOptions = window.INTERESTS.map(item => {
      return {
        key: item.id,
        text: item.name ? `${item.id} - ${item.name}` : (item.id),
        value: item.id
      }
    })
    return (
      <div className='home-section text ui container'>
        <h2>Create Strategy</h2>
        <Step.Group stackable='tablet' fluid>
          <Step active={(step == 1)} completed={(step > 1)} icon='dollar' title='Amount' />
          <Step active={(step == 2)} completed={(step > 2)} icon='lightbulb' title='Interests' />
          <Step active={(step == 3)} completed={(step > 3)} disabled icon='exchange' title='Save &amp; Trade' />
        </Step.Group>
        <Segment className='create-strategy-wizard'>
          { (step == 1 ) && (
            <Form onSubmit={(e) => this.next(e)} size='huge'>
              <Form.Field inline>
                <label>I want to invest</label>
                <Input labelPosition='right' type='text' placeholder='Amount'>
                  <Label basic>$</Label>
                  <input />
                  <Label>.00</Label>
                </Input>
              </Form.Field>
              <Button fluid type='submit' size='big' primary onClick={(e) => this.next(e)}>
                Next
              </Button>
            </Form>
          )}
          { (step == 2 ) && (
            <Form onSubmit={(e) => this.next(e)} size='huge'>
              <Form.Field inline>
                <label>I want to build my portfolio around</label>
              </Form.Field>
              <Dropdown placeholder='Search' fluid selection search multiple options={interestOptions} />
              <Divider hidden />
              <Button fluid type='submit' size='big' primary onClick={(e) => this.next(e)}>
                Next
              </Button>
            </Form>
          )}
          { (step == 3 ) && (
            <Form onSubmit={(e) => this.create(e)} size='huge'>
              <Form.Field inline>
                <label>My strategy is called</label>
                <input placeholder='Enter name' />
              </Form.Field>
              <Form.Field>
                <Checkbox label='I agree to the Terms and Conditions' />
              </Form.Field>
              <Button fluid type='submit' size='big' primary>
                Calculate
              </Button>
            </Form>
          )}
          { (step == 4 ) && (
            <Progress size='huge' percent={progress} active color='blue'>Calculating...</Progress>
          )}
        </Segment>
      </div>
    )
  }
}
