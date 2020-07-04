import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './index.module.css';
import Banner from '../../Shared/Banner';
import TextBox from '../../Shared/TextBox';
import Button from '../../Shared/Button';
import { createPost } from '../../../store/forum/actions';
import { AppState } from '../../../store';
import { useRouter } from 'next/router';

const CreatePost = (): JSX.Element => {
  const dispatch = useDispatch();
  const router = useRouter();
  const createPostRequest = useSelector(
    (state: AppState) =>
      state.request.CREATE_NEW_POST || { success: false, errored: false, error: null }
  );
  const newPostId = useSelector((state: AppState) => state.forum.post?.id || null);
  const [form, setForm] = useState({
    title: '',
    body: ''
  });

  useEffect(() => {
    if (createPostRequest.success && newPostId) {
      router.push(`/forum/post/${newPostId}`);
    }
  }, [createPostRequest, newPostId, router]);

  const handleClick = (event): void => {
    event.preventDefault();

    dispatch(createPost(form));
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Banner>Forum</Banner>
        <div className={styles.wrapper}>
          {createPostRequest.errored && <span>{createPostRequest.error}</span>}
          <TextBox
            className={styles.text}
            maxLength="100"
            value={form.title}
            height="75px"
            onChange={(e): void => setForm({ ...form, title: e.target.value })}
            placeholder="The title of your post."
          />
          <TextBox
            className={styles.text}
            value={form.body}
            height="400px"
            onChange={(e): void => setForm({ ...form, body: e.target.value })}
            placeholder="The contents of your post."
          />
          <Button onClick={handleClick}>create post</Button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
