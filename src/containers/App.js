import React, { Component } from 'react';
import CardList from '../components/CardList';
import { connect } from 'react-redux';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundery';
import './App.css';
import { SetSearchField , requestRobots} from '../action'
// import thunk from 'redux-thunk';

const mapStateToProps = state => {
  return {
    searchfield: state.searchRobots.searchfield,
    robots : state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    onSearchChange: (event) => dispatch(SetSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends Component {
  
  // For React


  // constructor() {
  //   super()
  //   this.state = {
  //     robots: [],
  //   }
  // }

  componentDidMount() {
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(response => response.json())
    //   .then(users => { this.setState({ robots: users }) });

    // with Redux-thunk connect

    this.props.onRequestRobots();
  }



  render() {
    // const { robots } = this.state;
    const { searchfield, onSearchChange ,robots ,isPending} = this.props;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return isPending ?
      <h1>Loading....</h1> :
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