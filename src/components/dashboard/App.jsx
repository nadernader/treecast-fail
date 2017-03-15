
const React = require('react')
import { Link } from 'react-router'
import { Menu, Icon } from 'semantic-ui-react'

import '../../styles/dashboard.css'
import logo from '../../images/treecast_inverted.svg';

export default class App extends React.Component {
  render () {
    return (
      <div className='app'>
        <Menu fixed='top' icon='labeled' inverted>
          <div className='ui container'>
            <Menu.Item className='logo' as={Link} to='/'>
              <img src={logo}></img>
            </Menu.Item>
            <Menu.Item name='home' active={(this.props.children.type.name === 'HomeSection')} as={Link} to='/home'>
              <Icon name='home' /> Home
            </Menu.Item>
            <Menu.Item name='market_trends' active={(this.props.children.type.name === 'ExploreSection')} as={Link} to='/expore'>
              <Icon name='line chart' /> Market Trends
            </Menu.Item>
            <Menu.Item name='explore' active={(this.props.children.type.name === 'ExploreSection')} as={Link} to='/expore'>
              <Icon name='list' /> Explore
            </Menu.Item>
          </div>
        </Menu>
        <div className='app-view-container ui container'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
