import React from 'react';
import Puhelinluettelo from './components/Puhelinluettelo'
import Filtteri from './components/Filtteri'
import Lisayslomake from './components/Lisayslomake';

import personService from './services/persons'

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
    personService.getAll().then( persons => {
      this.setState({
        persons
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

    personService.create(newPerson).then( data => {
      this.setState({
        persons: this.state.persons.concat(data)
      })
    })
  }

  handleRemove = id => {
    return () => {
      if(!window.confirm('Oletko varma')) {
        return
      }

      personService.remove(id).then( data => {
        this.setState({
          persons: this.state.persons.filter(person => person.id !== id)
        })
      })
    }
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
        
        <Puhelinluettelo 
          persons={this.state.persons}
          filter={this.state.filter}
          handleRemove={this.handleRemove} />
      </div>
    )
  }
}

export default App