import React from 'react';
import Comment from './Comment';

const Comments = (props): JSX.Element => {
  const { comments, parentId } = props;

  return (
    <>
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </>
  );
};

export default Comments;
