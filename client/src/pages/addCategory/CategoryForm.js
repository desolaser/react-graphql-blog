import React from 'react'
import { TextField, Button } from '@material-ui/core'

const CategoryForm = ({name, setName, handleSubmit}) => (
  <>
    <TextField
      id="name"
      label="Name"
      style={{ margin: 8 }}
      placeholder="Name here"
      helperText="The name of the post"
      fullWidth
      margin="normal"
      onChange={e => setName(e.target.value)}
      value={name}
      InputLabelProps={{
          shrink: true,
      }}
    />
    <Button
        variant="contained"
        color="primary"
        style={{ marginBottom: 20 }}
        onClick={handleSubmit}
    >
        Add Category
    </Button>
  </>
)

export default CategoryForm