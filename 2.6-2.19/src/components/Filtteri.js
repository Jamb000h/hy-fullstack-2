import React from 'react'

const Filtteri = (props) => {
  return (
    <input
        onChange={props.onChange}
        value={props.value} />
  )
}

export default Filtteri