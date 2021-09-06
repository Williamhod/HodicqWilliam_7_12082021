import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import CommentIcon from "@material-ui/icons/Comment";
import "./Post.scss";
import Comment from "../Comment/Comment";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import SendIcon from "@material-ui/icons/Send";
import Moment from "react-moment";
import "moment/locale/fr";

import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
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
    paddingTop: "56.25%",
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
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  

  const userId = localStorage.getItem("userid");
  const postId = post.id;

  const getComments = () => {
    Axios.get(`http://localhost:3001/post/${postId}/comments`)
      .then((res) => res.data)
      .then(({ results }) => {
        setComments(results);
        console.log(results);
      });
  };

  const sendComment = () => {
    Axios.post("http://localhost:3001/post/comment", {
      userId: userId,
      postId: postId,
      comment: comment,
    }).then((_res) => {
      // setComments([...comments, comment]);
      getComments();
       setComment("")
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendComment();
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
    getComments();
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
           {post.firstname.substr(0,1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${post.title} by @${post.lastname} ${post.firstname}`}
        subheader={
          <Moment fromNow className="post-date">
            {post.created_at}
          </Moment>
        }
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
          <IconButton onClick={() => likePost(index)}>
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
          <CommentIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Paper component="form" onSubmit={onSubmit} className="input-comment-container">
            <IconButton className={classes.iconButton} aria-label="">
              <TextFieldsIcon />
            </IconButton>
            <InputBase
              className="comment-input-card"
              placeholder="Ecrit ton commentaire"
              type="text"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
            />
            <IconButton
              color="primary"
              className={classes.iconButton}
              onClick={sendComment}
              aria-label="envoyer un commentaire"
            >
              <SendIcon />
            </IconButton>
          </Paper>
          {comments.length ? (
            comments.map((comment) => (
              <Comment author={comment.author} content={comment.comment} />
            ))
          ) : (
            <p>Be The Very First one To comment</p>
          )}
          {/* <Typography paragraph className="comment">
            <p className="comment-content">
              <span className="comment-provider">Hodicq William : </span>
              Super cette image ! bla bla bla bla Lorem ipsum dolor, sit amet
              consectetur adipisicing elit. Minus corporis sapiente pariatur
              omnis modi quibusdam doloremque hic quos dignissimos dolore,
              placeat ut sed aut culpa facilis aperiam alias velit temporibus
              voluptates, quidem at sit recusandae.
            </p>
            <IconButton
              aria-label="settings"
              className="settings-comment-button"
            >
              <MoreHorizIcon />
            </IconButton>
          </Typography>
          <Typography paragraph className="comment">
            <p className="comment-content">
              <span className="comment-provider">Forth :</span> Mwé, tu peux
              mieux faire hein !
            </p>
            <IconButton
              aria-label="settings"
              className="settings-comment-button"
            >
              <MoreHorizIcon />
            </IconButton>
          </Typography>
          <Typography paragraph className="comment">
            <p className="comment-content">
              <span className="comment-provider">Nono :</span> Rhooo Vincent !
              Soit Gentil !
            </p>
            <IconButton
              aria-label="settings"
              className="settings-comment-button"
            >
              <MoreHorizIcon />
            </IconButton>
          </Typography> */}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;
