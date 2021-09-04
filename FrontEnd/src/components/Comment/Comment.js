import { IconButton, Typography } from "@material-ui/core"
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

function Comment({author, content}) {
    return (
        <Typography paragraph className="comment">
            <span className="comment-content">
              <span className="comment-provider">{author} : </span>
              {content}
            </span>
            <IconButton
              aria-label="settings"
              className="settings-comment-button"
            >
              <MoreHorizIcon />
            </IconButton>
          </Typography>
    )
}

export default Comment
