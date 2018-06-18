import React from 'react';

const Puhelinluettelo = (props) => {
  const persons = props.persons.map( (person, i) => {
    return <Person key={person.name} person={person} />
  })
  return (
    <ul>
      {persons}
    </ul>
  )
}

const Person = (props) => {
  return (
    <li>
      {props.person.name}
    </li>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  handleNameChange = event => {
    this.setState({
      newName: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()

    const newPerson = {
      name: this.state.newName
    }
    
    const nameFound = this.state.persons.find( 
      person => person.name === this.state.newName)

    if(nameFound) return

    const persons = this.state.persons.concat(newPerson)

    this.setState({
      persons: persons
    })
  }

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.handleSubmit} >
          <div>
            nimi:
            <input
              onChange={this.handleNameChange}
              value={this.state.newName} />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
        <Puhelinluettelo persons={this.state.persons} />
      </div>
    )
  }
}

export default App