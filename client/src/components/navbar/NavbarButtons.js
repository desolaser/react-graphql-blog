import React from 'react'
import { Button } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { logout } from '../../redux/reducers/authSlice'

const NavbarButtons = () => {
  const auth = useSelector(store => store.auth)
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = (e) => {
    dispatch(logout())
    alert("User logged out")
    history.push('/')
    history.go(0)
  }

  return (
    <>
      {!auth.user && 
        <>
          <Link to="/sign-up">
            <Button variant="contained" color="primary">
              Sign up
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="contained" color="primary">
              Login
            </Button>
          </Link>
        </>
      }
      {auth.user && auth.user.role === "Admin" &&
        <>
          <Link to="/add-category">
            <Button variant="contained" color="primary">
              Add Category
            </Button>
          </Link>
          <Link to="/add-topic">
            <Button variant="contained" color="primary">
              Add Topic
            </Button>
          </Link>
        </>
      }
      {auth.user &&
        <>
          <Link to="/add-post">
            <Button variant="contained" color="primary">
              Add Post
            </Button>
          </Link>
          <Button onClick={handleLogout} variant="contained" color="primary">
            Logout
          </Button>
        </>
      }
    </>
  )
}

export default NavbarButtons