import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { makeStyles } from '@material-ui/styles'

import Category from './Category'

const useStyles = makeStyles({
    categories: {
        marginTop: 15
    }
})

const GET_CATEGORIES = gql`
    {
        categories {
            id
            name 
            topics {
                id
                name      
            }
        }
    }
`

const MainPage = () => {
    const classes = useStyles()
    const { loading, error, data } = useQuery(GET_CATEGORIES)

    if (loading) return "Loading..."
    if (error) return `Error ${error.message}`

    return (
        <div className={classes.categories}>
            {data.categories.map(category => (                    
                <Category key={category.id} data={category}/>
            ))}
        </div>
    )
}

export default MainPage