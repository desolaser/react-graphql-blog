import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useMutation } from '@apollo/client'
import { useHistory } from 'react-router-dom'

import { login } from '../../redux/reducers/authSlice'
import SIGN_UP from '../../mutations/SignUp'
import SignUpForm from './SignUpForm'

const INITIAL_DATA = {
  name: "",
  email: "",
  password: ""
}

const SignUp = () => {
  const history = useHistory()
  const dispatch = useDispatch()

  const [data, setData] = useState(INITIAL_DATA)
  const [signUpMutation, { errors }] = useMutation(SIGN_UP)

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signUpMutation({ variables: data })
      .then(({data}) => {
        if (data.signUp) {
          dispatch(login({
            user: data.signUp.user,
            token: data.signUp.payload
          }))
          setData(INITIAL_DATA)
          alert("Account registered, login successful")
          history.push('/')
        }
      })
      .catch(err => {
        alert(err.message)
      })
    if (errors) return alert(errors.message)
  }
  
  return (
    <SignUpForm
      data={data}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  )
}

export default SignUp