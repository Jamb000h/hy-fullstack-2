import React from 'react';
import Puhelinluettelo from './components/Puhelinluettelo'
import Filtteri from './components/Filtteri'
import Lisayslomake from './components/Lisayslomake'
import Notifikaatio from './components/Notifikaatio'

import personService from './services/persons'

import './index.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      notification: {
        show: false,
        status: '',
        text: ''
      }
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
    
    const person = this.state.persons.find( 
      person => person.name === this.state.newName)

    if(person) {
      if(window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const updatedPerson = {
          id: person.id,
          name: person.name,
          number: this.state.newNumber
        }

        personService.update(person.id, updatedPerson).then( data => {
          this.setState({
            persons: this.state.persons.map( person => person.id !== data.id ? person : data),
            notification: {
              show: true,
              status: 'success',
              text: `Henkilön ${data.name} puhelinnumero on päivitetty!`
            }
          })
        })

        setTimeout(() => {
          this.setState({
            notification: {
              show: false,
              status: '',
              text: ''
            }
          })
        }, 5000)

      }

      return
    }

    const newPerson = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    personService.create(newPerson).then( data => {
      this.setState({
        persons: this.state.persons.concat(data),
        notification: {
          show: true,
          status: 'success',
          text: `Henkilön ${data.name} lisäys onnistui!`
        }
      })

      
      setTimeout(() => {
        this.setState({
          notification: {
            show: false,
            status: '',
            text: ''
          }
        })
      }, 5000)
    })
  }

  handleRemove = id => {
    return () => {

      const name = this.state.persons.find( person => person.id === id).name

      if(!window.confirm(`Oletko varma että haluat poistaa henkilön ${name}?`)) {
        return
      }

      personService.remove(id).then( data => {
        this.setState({
          persons: this.state.persons.filter(person => person.id !== id),
          notification: {
            show: true,
            status: 'success',
            text: `${name} poistettiin onnistuneesti!`
          }
        })
      })

      setTimeout(() => {
        this.setState({
          notification: {
            show: false,
            status: '',
            text: ''
          }
        })
      }, 5000)
    }
  }

  render() {
    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <Notifikaatio notification={this.state.notification} />
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