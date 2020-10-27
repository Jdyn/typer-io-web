import Comment from './Comment';

const Comments = (props): JSX.Element => {
  const { comments } = props;

  return (
    <>
      {comments.map((comment, index) => (
        <Comment key={index} comment={comment} />
      ))}
    </>
  );
};

export default Comments;
