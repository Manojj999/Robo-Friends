import React, { Component } from 'react';
import CardList from '../components/CardList';
import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundery';
import './App.css';
import { SetSearchField } from '../action'

const mapStateToProps = state => {
  return {
    searchfield: state.searchRobots.searchfield,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    onSearchChange: (event) => {
      dispatch(SetSearchField(event.target.value));
    }
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      robots: [],
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => { this.setState({ robots: users }) });
  }



  render() {
    const { robots } = this.state;
    const { searchfield, onSearchChange } = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !robots.length ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>My Batch</h1>
          <SearchBox searchChange={onSearchChange} />
          <Scroll>
            <ErrorBoundry>
              <CardList robots={filteredRobots} />
            </ErrorBoundry>
          </Scroll>
        </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);