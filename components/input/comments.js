import { useState, useEffect, useContext } from "react";

import CommentList from "./comment-list";
import NewComment from "./new-comment";
import classes from "./comments.module.css";
import NotificationContext from "../../store/notification-context";

function Comments(props) {
  const { eventId } = props;

  const [loadingComments, setLoadingComments] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      fetch("/api/comments/" + eventId)
        .then((res) => res.json())
        .then((data) => {
          setLoadingComments(false);
          setComments(data.comments);
        });
    }
  }, [showComments]);

  function toggleCommentsHandler() {
    setLoadingComments(true);
    setShowComments((prevStatus) => !prevStatus);

    if (!showComments) {
    }
  }

  function addCommentHandler(commentData) {
    notificationCtx.showNotification({
      title: "Enroll Comment ",
      message: "Enrolling Comments",
      status: "pending",
    });
    // send data to API
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong!");
        });
      })
      .then((data) =>
        notificationCtx.showNotification({
          title: "Success",
          message: "Comments are saved!",
          status: "success",
        })
      )
      .catch((error) => {
        notificationCtx.showNotification({
          title: "Error!",
          message: error.message,
          status: "error",
        });
      }); // {email : "test@test.com", text: 'Some feedback text'};
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {loadingComments && <p>Loading...</p>}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
