import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import { login } from '../../redux/reducers/authSlice'
import LOGIN from '../../mutations/Login'
import LoginForm from './LoginForm'

const INITIAL_DATA = {
  username: "",
  password: ""
}

const Login = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [data, setData] = useState(INITIAL_DATA)
  const [loginMutation, { errors }] = useMutation(LOGIN)

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    loginMutation({ variables: data })
      .then(({ data }) => {
        if (data.login) {
          dispatch(login({
            user: data.login.user,
            token: data.login.payload
          }))
          alert("Login successful")
          setData(INITIAL_DATA)
          history.push('/')
        }
      })
      .catch(err => {
        console.log(err.message)
      })
    if (errors) return alert(errors.message)
  }

  return (
    <LoginForm data={data} handleChange={handleChange} handleSubmit={handleSubmit}/>
  )
}

export default Login