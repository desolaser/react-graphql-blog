import React from 'react'
import { AppBar, Typography } from '@material-ui/core'

import Post from './Post'

const Category = props => {
    return (
        <div>
            <AppBar>
                <Typography variant="subtitle1">
                    {props.category.name}
                </Typography>
            </AppBar>
        </div>
    )
}