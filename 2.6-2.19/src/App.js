import React from 'react';

const Puhelinluettelo = (props) => {

  const filteredPersons =
    props.filter === '' ? 
    props.persons :
    props.persons.filter( person => {
      return person.name.toLowerCase().indexOf(props.filter.toLowerCase(), 0) > -1
    })

  const persons = filteredPersons.map( person => {
    return <Person key={person.name} person={person} />
  })

  return (
    <ul>
      { persons }
    </ul>
  )
}

const Person = (props) => {
  return (
    <li>
      {props.person.name} {props.person.number}
    </li>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas',
          number: '0401234567' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
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
        <input
          onChange={this.handleFilterChange}
          value={this.state.filter} />
        <h2>Lisää uusi</h2>
        <form onSubmit={this.handleSubmit} >
          <div>
            nimi:
            <input
              onChange={this.handleNameChange}
              value={this.state.newName} />
            <br />
            numero:
            <input
              onChange={this.handleNumberChange}
              value={this.state.newNumber} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <Puhelinluettelo persons={this.state.persons} filter={this.state.filter} />
      </div>
    )
  }
}

export default App