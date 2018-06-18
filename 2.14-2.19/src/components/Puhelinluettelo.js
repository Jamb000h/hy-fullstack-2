import React from 'react'

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

export default Puhelinluettelo