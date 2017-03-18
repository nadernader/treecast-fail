
const React = require('react')
import { Link } from 'react-router'
import { Segment, Button, Message, Icon, Table } from 'semantic-ui-react'
const ForestView = require('./ForestView')

export default class TrendsSection extends React.Component {
  render () {
    return (
      <div className='trends-section'>
        <h3>Macro Correlations</h3>
        <Segment>
          <ForestView></ForestView>
        </Segment>
      </div>
    )
  }
}
