import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";


function Post({post, index, likePost}) {
  return (
    <div className="post">
      <div className="image">
        <img src={`http://localhost:3001/${post.image}`} alt="" />
      </div>
      <div className="content">
        <div className="title">
          {post.title} /by @ {post.lastname} {post.firstname}
        </div>
        <div className="description">{post.description}</div>
      </div>
      <div className="Engagement">
        {post.isLiked ? (
          <ThumbUpIcon
            id="likeButton"
            onClick={() => {
              likePost(index);
            }}
          />
        ) : (
          <ThumbDownIcon
            id="likeButton"
            onClick={() => {
              likePost(index);
            }}
          />
        )}
        {post.nbLikes}
      </div>
    </div>
  );
}

export default Post;
