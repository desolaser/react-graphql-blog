import React from 'react'
import { Card, CardHeader, CardContent, TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    padding: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    marginTop: 20,
    marginBottom: 20
  },
  button: {
    marginTop: 20,
  }
})

const SignUpForm = ({ data, handleChange, handleSubmit }) => {
  const classes = useStyles()
  return (
    <Card className={classes.root}>
      <CardHeader title="Sign In" />
      <CardContent>
        <TextField 
          className={classes.input}
          name="name"
          label="Username"
          placeholder="Username"
          helperText="Insert your username"
          value={data.name}
          onChange={handleChange}
          InputLabelProps={{
              shrink: true,
          }}
        />
        <TextField 
          className={classes.input}
          name="email"
          label="Email"
          placeholder="Email"
          helperText="Example: johan@gmail.cl"
          value={data.email}
          onChange={handleChange}
          InputLabelProps={{
              shrink: true,
          }}
        />
        <TextField 
          className={classes.input}
          name="password"
          label="Password"
          placeholder="Password"
          helperText="Insert your password"
          value={data.password}
          onChange={handleChange}
          InputLabelProps={{
              shrink: true,
          }}
        />
      </CardContent>
      <Button 
        className={classes.button} 
        variant="contained" 
        color="primary"
        onClick={handleSubmit}>
        Sign Up
      </Button>
    </Card>
  )
}

export default SignUpForm