import React from 'react'

const Lisayslomake = (props) => {
  return (
    <form onSubmit={props.onSubmit} >
      <div>
        nimi:
        <input
          onChange={props.onNameChange}
          value={props.nameValue} />
        <br />
        numero:
        <input
          onChange={props.onNumberChange}
          value={props.numberValue} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
} 

export default Lisayslomake