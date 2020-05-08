import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import { 
    AppBar, 
    Toolbar, 
    IconButton, 
    Typography, 
    Button, 
    MenuItem, 
    Menu, 
    Fade 
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
}));
  
const Header = () => {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon onClick={handleClick}/>
                    <Menu
                        id="fade-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem component={Link} to="/" onClick={handleClose}>Home</MenuItem>
                        <MenuItem component={Link} to="/post" onClick={handleClose}>Post</MenuItem>
                        <MenuItem component={Link} to="/comment" onClick={handleClose}>Comment</MenuItem>
                    </Menu>
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    News
                </Typography>
                <Button color="inherit">Login</Button>
            </Toolbar>
        </AppBar>        
    )
}

export default Header