import React from 'react'
import './AvatarUsername.css'

const AvatarUsername = (props) => {
  return (
    <span className="avatar-username">
      {props.textBefore && (
        <span className="text-before">{props.textBefore}</span>
      )}
      <picture>
        <img src={props.avatarUrl} alt={props.username.charAt(0)} />
      </picture>
      <span className="username">{props.username}</span>
    </span>
  )
}

export default AvatarUsername
