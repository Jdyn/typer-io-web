import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './index.module.css';
import Banner from '../../Shared/Banner';
import TextBox from '../../Shared/TextBox';
import Button from '../../Shared/Button';
import { useAddPostMutation } from '../../../services/forum';

const CreatePost = (): JSX.Element => {
  const router = useRouter();
  const [addPost, { data: post, status, isLoading, isError, error }] = useAddPostMutation();

  const [form, setForm] = useState({
    title: '',
    body: ''
  });

  useEffect(() => {
    if (status === 'fulfilled') {
      router.push(`/forum/post/${post.id}`);
    }
  }, [post, router, status]);

  const parseErrors = () => {
    if ((error as any)?.data?.error) return (error as any).data.error;

    const { errors } = (error as any)?.data;

    return (
      <>
        {Object.keys(errors).map((key) => (
          <div>{`${key} ${errors[key][0]}`}</div>
        ))}
      </>
    );
  };

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Banner>
          <h3>Create Post</h3>
        </Banner>
        <div className={styles.wrapper}>
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
          {isError && <div className={styles.errors}>{parseErrors()}</div>}
          <div className={styles.buttonContainer}>
            <Button color="#fff" padding="10px" isPending={isLoading} onClick={() => addPost(form)}>
              create post
            </Button>
            <Link href="/forum">
              <Button secondary padding="10px">
                cancel
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
