import React from 'react'

const Notifikaatio = props => {
  if(props.notification.show) {
    return (
      <div className={"notification " + props.notification.status}>
        {props.notification.text}
      </div>
    )
  }

  return null
}

export default Notifikaatio