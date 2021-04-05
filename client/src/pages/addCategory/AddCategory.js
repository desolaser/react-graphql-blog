import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { Card, CardHeader, CardContent } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

import ADD_CATEGORY from '../../mutations/AddCategory'
import CategoryForm from './CategoryForm'

const useStyles = makeStyles({
  root: {
    marginTop: 15
  }
})

const AddPost = () => {
  const classes = useStyles()

  const [ name, setName ] = useState("")
  const [addPost, { data }] = useMutation(ADD_CATEGORY)

  const handleSubmit = e => {
    e.preventDefault()

    addPost({ variables: {
      name,
      userId: "5f19a89406e46c239cb04040",
    } })

    setName("")

    console.log(data)
    alert("Category added.")
  }

  return (
    <Card className={classes.root}>
      <CardHeader title="Add Category" />
      <CardContent>
        <CategoryForm
          name={name}
          setName={setName}
          handleSubmit={handleSubmit}
        />
      </CardContent>
    </Card>
  )
}

export default AddPost