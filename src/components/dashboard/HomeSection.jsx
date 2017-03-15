
const React = require('react')
import { Link } from 'react-router'
import { Button, Message, Icon, Table } from 'semantic-ui-react'

export default class HomeSection extends React.Component {
  render () {
    return (
      <div className='home-section'>
        <h2>My Strategies</h2>
        { window.strategyCreated ? (
          <Table collapsing selectable celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Predicted Return</Table.HeaderCell>
                <Table.HeaderCell>Created</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row onClick={() => { document.location.href = '/strategies/1'}}>
                <Table.Cell>Warren's Growth Strategy</Table.Cell>
                <Table.Cell textAlign='center'><div className='ui green label'>53.2%</div></Table.Cell>
                <Table.Cell>1 minute ago</Table.Cell>
                <Table.Cell textAlign='center'>
                  <Button basic icon='trash'></Button>
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
