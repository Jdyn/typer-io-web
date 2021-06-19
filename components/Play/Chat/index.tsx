import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './index.module.css';
import { AppState } from '../../../store';
import { sendChatMessage } from '../../../store/game/actions';
import Paper from '../../Shared/Paper';

interface Props {
  isCustom?: boolean;
}

const Chat = (props: Props): JSX.Element => {
  const { isCustom } = props;
  const client = useSelector((state: AppState) => state.game.meta);
  const messages = useSelector((state: AppState) => state.game.room.messages);
  const [input, setInput] = useState('');

  useEffect(() => {
    const display = document.getElementById('chat');

    display.scrollTop = display.scrollHeight;
  }, [messages]);

  const submitMessage = (event): void => {
    event.preventDefault();
    const payload = {
      username: client.username,
      id: client.id,
      message: input
    };
    sendChatMessage(payload);
    setInput('');
  };

  return (
    <div className={styles.root}>
      <Paper title="Chat">
        <div className={styles.container}>
          <div id="chat" className={styles.wrapper}>
            {messages.map((message, index) => (
              <div className={styles.message} key={index}>
                <span
                  style={{
                    alignSelf:
                      client.id === message.id ? 'flex-end' : 'flex-start'
                  }}
                >
                  {message.username}
                </span>
                <div
                  style={{
                    background: message.color,
                    alignSelf:
                      client.id === message.id ? 'flex-end' : 'flex-start'
                  }}
                >
                  {message.message}
                </div>
              </div>
            ))}
          </div>
        </div>
        <form className={styles.form} onSubmit={(e) => submitMessage(e)}>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            placeholder={'Write a message...'}
            required
          />
        </form>
      </Paper>
    </div>
  );
};

export default Chat;
