import { IconButton, Typography } from "@material-ui/core";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import axios from "axios";
import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
/**
 * Here is comments components who a get data response to set up it
 * Only comment user or admin can get the possibility to remove a comment
 */
function Comment({ author, content, userId, commentId, getComments }) {
  const removeComment = () => {
    console.log(commentId, "comment id");
    console.log(userId, "userid");
    axios
      .delete("http://localhost:3001/post/comment/" + commentId)
      .then(() => getComments())
      .catch((err) => {
        console.log(err);
      });
  };

  const {
    connexion: { user },
  } = useContext(AuthContext);
  return (
    <Typography paragraph className="comment">
      <span className="comment-content">
        <span className="comment-provider">{author} : </span>
        {content}
      </span>

      {user.userId === userId || !!user.isAdmin === true ? (
        <IconButton
          aria-label="settings"
          className="settings-comment-button"
          onClick={removeComment}
        >
          <DeleteForeverIcon />
        </IconButton>
      ) : (
        <></>
      )}
    </Typography>
  );
}

export default Comment;
