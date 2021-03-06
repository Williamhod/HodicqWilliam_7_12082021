import React, { useContext, useState } from "react";
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
import InputBase from "@material-ui/core/InputBase";
import DeleteIcon from "@material-ui/icons/Delete";
import FavoriteIcon from "@material-ui/icons/Favorite";
import CommentIcon from "@material-ui/icons/Comment";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import SendIcon from "@material-ui/icons/Send";
import "./Post.scss";
import Comment from "../Comment/Comment";
import Paper from "@material-ui/core/Paper";
import Moment from "react-moment";
import "moment/locale/fr";

import Axios from "axios";
import AuthContext from "../../context/AuthContext";

//this compenent set up all cards for the post he also connected with  comments compenents
//The card adapt them self about picture content or not with a simple condition

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

function Post({ post, index, likePost, getPosts }) {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const gotImage = post.image.length > 0;

  const {
    connexion: { user },
  } = useContext(AuthContext);

  const postId = post.id;

  const removePost = () => {
    console.log("remove", postId);
    Axios.delete("http://localhost:3001/post/" + postId)
      .then(() => getPosts())
      .catch((err) => {
        console.log(err);
      });
  };

  const getComments = () => {
    Axios.get(`http://localhost:3001/post/${postId}/comments`, {})
      .then((res) => res.data)
      .then(({ results }) => {
        setComments(results);
        console.log("comments", results);
      });
  };

  const sendComment = () => {
    Axios.post("http://localhost:3001/post/comment", {
      userId: user.userId,
      postId: postId,
      comment: comment,
    }).then((_res) => {
      getComments();
      setComment("");
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
            {post.firstname.substr(0, 1)}
          </Avatar>
        }
        action={
          user.userId === post.userId || !!user.isAdmin === true ? (
            <IconButton
              aria-label="settings"
              onClick={() => {
                removePost();
              }}
            >
              <DeleteIcon />
            </IconButton>
          ) : (
            <></>
          )
        }
        title={`${post.title} by @${post.lastname} ${post.firstname}`}
        subheader={
          <Moment fromNow className="post-date">
            {post.created_at}
          </Moment>
        }
      />
      {gotImage ? (
        <CardMedia
          className={classes.media}
          image={`http://localhost:3001/${post.image}`}
          title={post.title}
        />
      ) : (
        <></>
      )}

      <CardContent className="post-description-container">
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
          <Paper
            component="form"
            onSubmit={onSubmit}
            className="input-comment-container"
          >
            <IconButton className={classes.iconButton} aria-label="">
              <TextFieldsIcon />
            </IconButton>
            <InputBase
              className="comment-input-card"
              placeholder="Ecris ton commentaire"
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
            comments.map((comment, key) => (
              <Comment
                author={comment.author}
                userId={comment.userId}
                commentId={comment.commentId}
                key={key}
                content={comment.comment}
                getComments={getComments}
              />
            ))
          ) : (
            <p>Be The Very First one To comment</p>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;
