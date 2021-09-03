import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./Post.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    //maxWidth: 345,
    backgroundColor: "#fff9",
    margin: "20px 0",
    [theme.breakpoints.up("xs")]: { width: "100%" },
    [theme.breakpoints.up("sm")]: { width: "90%" },
    [theme.breakpoints.up("md")]: { width: "85%" },
    [theme.breakpoints.up("lg")]: { width: "80%" },
    [theme.breakpoints.up("xl")]: { width: "70%" },
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function Post({ post, index, likePost }) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${post.title} by @${post.lastname} ${post.firstname}`}
        subheader={post.created_at}
      />
      <CardMedia
        className={classes.media}
        image={`http://localhost:3001/${post.image}`}
        title={post.title}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {post.isLiked ? (
          <IconButton
            onClick={() => {
              likePost(index);
            }}
          >
            <FavoriteIcon className="Likeposition" />
          </IconButton>
        ) : (
          <IconButton
            onClick={() => {
              likePost(index);
            }}
          >
            <FavoriteIcon />
          </IconButton>
        )}
        <span>{post.nbLikes} </span>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Commentaire</Typography>
          <Typography paragraph>1er comments</Typography>
          <Typography paragraph>2eme comments</Typography>
          <Typography paragraph>3eme comments</Typography>
          <Typography>4eme comments</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;
