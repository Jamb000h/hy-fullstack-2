import React from 'react'

const Puhelinluettelo = (props) => {

  const filteredPersons =
    props.filter === '' ? 
    props.persons :
    props.persons.filter( person => {
      return person.name.toLowerCase().indexOf(props.filter.toLowerCase(), 0) > -1
    })

  const persons = filteredPersons.map( person => {
    return <Person key={person.name} person={person} handleRemove={props.handleRemove} />
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
      <button onClick={props.handleRemove(props.person.id)}>poista</button>
    </li>
  )
}

export default Puhelinluettelo