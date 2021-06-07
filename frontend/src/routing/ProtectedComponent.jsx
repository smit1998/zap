/* eslint-disable react/prop-types */
import React from 'react'
import { Redirect } from 'react-router-dom'

export const ProtectedComponent = (props) => {
    const token = window.localStorage.token;
    console.log(token)
    if (token === null) {
        return <Redirect to="/login" />
    }
    return <div>{props.children}</div>
}
