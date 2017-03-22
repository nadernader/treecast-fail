
const React = require('react')
import { Link } from 'react-router'
import { Button, Message, Icon, Table } from 'semantic-ui-react'

export default class HomeSection extends React.Component {
  render () {
    let hasStrategies = true
    return (
      <div className='home-section'>
        <h2>My Strategies</h2>
        { hasStrategies ? (
          <Table collapsing selectable celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Created</Table.HeaderCell>
                <Table.HeaderCell>Predicted Return</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              { window.strategyCreated && (
                <Table.Row onClick={() => { document.location.href = '/strategies/1'}}>
                  <Table.Cell>My Demo Strategy</Table.Cell>
                  <Table.Cell>1 minute ago</Table.Cell>
                  <Table.Cell textAlign='center'><div className='ui green label'>7.11%</div></Table.Cell>
                  <Table.Cell textAlign='center'>
                    <Button basic icon='trash'></Button>
                    <Button basic icon='share'></Button>
                  </Table.Cell>
                </Table.Row>
              )}
              <Table.Row onClick={() => { document.location.href = '/strategies/1'}}>
                <Table.Cell>My Growth Strategy</Table.Cell>
                <Table.Cell>Yesterday</Table.Cell>
                <Table.Cell textAlign='center'><div className='ui green label'>53.2%</div></Table.Cell>
                <Table.Cell textAlign='center'>
                  <Button basic icon='trash'></Button>
                  <Button basic icon='share'></Button>
                </Table.Cell>
              </Table.Row>
              <Table.Row onClick={() => { document.location.href = '/strategies/1'}}>
                <Table.Cell>My Long Term Strategy</Table.Cell>
                <Table.Cell>5 days ago</Table.Cell>
                <Table.Cell textAlign='center'><div className='ui green label'>38.8%</div></Table.Cell>
                <Table.Cell textAlign='center'>
                  <Button basic icon='trash'></Button>
                  <Button basic icon='share'></Button>
                </Table.Cell>
              </Table.Row>
              <Table.Row onClick={() => { document.location.href = '/strategies/1'}}>
                <Table.Cell>My High Risk Strategy</Table.Cell>
                <Table.Cell>2 weeks ago</Table.Cell>
                <Table.Cell textAlign='center'><div className='ui yellow label'>12.2%</div></Table.Cell>
                <Table.Cell textAlign='center'>
                  <Button basic icon='trash'></Button>
                  <Button basic icon='share'></Button>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        ) : (
          <Message>No strategies created yet</Message>
        ) }
        <Button as={Link} to='/create-strategy' primary><Icon name="plus" />Create Strategy</Button>
      </div>
    )
  }
}
