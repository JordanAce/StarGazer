import React from 'react';
import ReactDOM from 'react-dom';
import BodyParser from 'body-parser';
import Search from './components/SearchBar.jsx'
import ConstellationList from './components/ConstellationList.jsx'
import $ from 'jquery'
import mongoose from 'mongoose'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      img: '',
      date:'',
      explanation: ''
    }
  }
  search(input) {
    let that = this;
    let data = input;
    console.log(`${data} was searched`)
      $.ajax({
      type: 'POST',
      url: ('/constellations'),
      data: data,
      success: function(data) {
        console.log(data)
        that.setState({
          img: data.url,
          date: data.date,
          explanation: data.explanation
        });
      },
      error: function (error) {
        console.log('ERROR ON POST REQUEST', error)
      }
    })
  }

  componentDidMount() {
    // this.setState({
    //   constellation : data
    // })
  }
  render () {
    return (
      <div>
        <h1>That's Stellar</h1>
        <ConstellationList img ={this.state.img} date = {this.state.date} explanation ={this.state.explanation}/>
        <Search onSearch = {this.search.bind(this)}/>
      </div>
    )  }

}

ReactDOM.render(<App />, document.getElementById("app"))