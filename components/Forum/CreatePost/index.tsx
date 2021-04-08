import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import Banner from '../../Shared/Banner';
import TextBox from '../../Shared/TextBox';
import Button from '../../Shared/Button';
import { createPost } from '../../../store/forum/actions';
import { AppState } from '../../../store';
import Link from 'next/link';

const CreatePost = (): JSX.Element => {
  const dispatch = useDispatch();
  const router = useRouter();
  const createPostRequest = useSelector(
    (state: AppState) =>
      state.request.CREATE_NEW_POST || {
        success: false,
        errored: false,
        isPending: false,
        error: null
      }
  );

  const newPostId = useSelector(
    (state: AppState) => state.forum.post?.id || null
  );
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
        <Banner>
          <h3>Create Post</h3>
        </Banner>
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
          <div className={styles.buttonContainer}>
            <Button
              color="#fff"
              padding="10px"
              isPending={createPostRequest?.isPending || false}
              onClick={handleClick}
            >
              create post
            </Button>
            <Link href="/forum">
              <Button secondary padding="10px">cancel</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
