import React, { useContext, useState, useEffect } from "react";
import AllMessagesItem from "./AllMessagesItem";
import Button from "@material-ui/core/Button";
import AddPostModal from "./AddPostModal";
import MessagesContext from "../../context/messages/MessagesContext";
import AuthContext from "../../context/auth/AuthContext";
import useInitializeListeners from "../../utils/useInitializeListeners";

const AllMessages = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;

  useInitializeListeners();

  const messagesContext = useContext(MessagesContext);
  const {
    pubsub: { fetchMessages, publish, addPost },
    getPostReplies,
    allPosts,
    getAllPosts,
    postReplies,
  } = messagesContext;
  useEffect(() => {
    getPostReplies();
  }, []);
  const arr = ["1", "2", "3"];
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getAllPosts();
  }, []);
  console.log(allPosts);
  return (
    <div class='container messages-all'>
      <AddPostModal open={open} handleClose={handleClose} />
      <div className='messages-container' id='messages-all'>
        <Button
          variant='contained'
          id='post-button'
          color='primary'
          disableElevation
          onClick={handleClickOpen}
        >
          Add Post
        </Button>{" "}
        {allPosts &&
          allPosts.map((item) => {
            return <AllMessagesItem post={item} />;
          })}
      </div>
    </div>
  );
};

export default AllMessages;
