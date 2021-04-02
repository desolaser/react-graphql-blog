import React from 'react'
import { useQuery } from '@apollo/client'
import { makeStyles } from '@material-ui/styles'
import { Card, CardContent, Typography } from '@material-ui/core'
 
import GET_CATEGORIES from '../../queries/GetCategories'

import Category from './Category'
import Loading from '../Loading'

const useStyles = makeStyles({
  categories: {
    marginTop: 15
  }
})

const MainPage = () => {
  const classes = useStyles()
  const { loading, error, data } = useQuery(GET_CATEGORIES)

  if (loading) return <Loading />
  if (error) return `Error ${error.message}`

  return (
    data.categories === [] ?
      <Card>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            The forum hasn't categories, add one    
          </Typography>
        </CardContent>
      </Card>
      :
      <div className={classes.categories}>
        {data.categories.map(category => (                    
          <Category key={category.id} data={category}/>
        ))}
      </div>
  )
}

export default MainPage