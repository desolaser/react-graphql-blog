import React from 'react'
import { 
  Grid, 
  Typography, 
  Card, 
  CardHeader, 
  CardContent 
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Remarkable } from 'remarkable'
import dateFormatter from '../../utils/dateFormatter'

const md = new Remarkable()

const useStyles = makeStyles({
  card: {
    height: "100%"
  }
})

const Post = ({ post }) => {
  const classes = useStyles()
  const formattedDate = dateFormatter(post.createdAt)

  return (
    <Grid container direction={"row"} spacing={3}>
      <Grid item xs={12} md={3}>
        <Card className={classes.card}>
          <CardContent>
            <Typography variant="h6">
              {post.user.name}
            </Typography>
            <Typography color="textSecondary">
              {post.user.role}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={9}>
        <Card className={classes.card}>
          <CardHeader
            title={post.title}
          />
          <CardContent>
            <Typography dangerouslySetInnerHTML={{__html: md.render(post.content)}} />
            <Typography mt={4} color="textSecondary">
              {formattedDate}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  )
}

export default Post