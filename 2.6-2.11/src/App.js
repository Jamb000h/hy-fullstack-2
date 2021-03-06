import React from 'react';
import Puhelinluettelo from './components/Puhelinluettelo'
import Filtteri from './components/Filtteri'
import Lisayslomake from './components/Lisayslomake';

import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3001/persons').then( response => {
      this.setState({
        persons: response.data
      })
    })
  }

  handleNameChange = event => {
    this.setState({
      newName: event.target.value
    })
  }

  handleNumberChange = event => {
    this.setState({
      newNumber: event.target.value
    })
  }

  handleFilterChange = event => {
    this.setState({
      filter: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    
    const nameFound = this.state.persons.find( 
      person => person.name === this.state.newName)

    if(nameFound) return

    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    const persons = this.state.persons.concat(newPerson)

    this.setState({
      persons: persons
    })
  }

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        rajaa näytettäviä:

        <Filtteri 
          onChange={this.handleFilterChange}
          value={this.state.filter} />

        <h2>Lisää uusi</h2>

        <Lisayslomake
          onSubmit={this.handleSubmit}
          onNameChange={this.handleNameChange}
          nameValue={this.state.newName}
          onNumberChange={this.handleNumberChange}
          numberValue={this.state.newNumber} />

        <h2>Numerot</h2>
        
        <Puhelinluettelo persons={this.state.persons} filter={this.state.filter} />
      </div>
    )
  }
}

export default App