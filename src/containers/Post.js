import React from 'react'
import { withRouteData } from 'react-static'
import { Link } from '@reach/router'
//
import Typography from '@material-ui/core/Typography'
import { Parser } from 'html-to-react'

const htmlToReactParser = new Parser()

export default withRouteData(({ post }) => (
  <div>
    <Typography type="body1" component={Link} to="/blog" gutterBottom>
      {'<'} Back
    </Typography>
    <Typography type="title" gutterBottom>
      {post.title}
    </Typography>
		{/* <Typography type="body1">{htmlToReactParser.parse(post.content)}</Typography> */}
		{htmlToReactParser.parse(post.content)}
  </div>
))
