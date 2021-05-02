import { useState, FormEvent, ChangeEvent } from 'react';
import Button from '../Button';
import Loader from '../Loader';
import styles from './index.module.css';

export interface FormTemplate {
  type: string;
  title: string;
  description?: string;
  fields: {
    name: string;
    type: string;
    key?: string;
    placeholder?: string;
  }[];
  submit: string;
}

interface Props {
  onSubmit: (type: string, form: object) => void;
  isPending?: boolean;
  template: FormTemplate;
}

const Form = (props: Props): JSX.Element => {
  const { onSubmit, template, isPending } = props;

  const [form, setForm] = useState({});

  const submitForm = (event: FormEvent): void => {
    event.preventDefault();
    onSubmit(template.type, form);
  };

  return (
    <form className={styles.form} onSubmit={submitForm}>
      <h3>{template.title}</h3>
      {template.description && <p>{template.description}</p>}
      {template.fields.map((field) => (
        <div className={styles.container} key={field.name}>
          <span>{field.name}</span>
          <input
            className={styles.input}
            value={form[field.key || field.name] || ''}
            type={field.type || field.key}
            placeholder={field.placeholder}
            onChange={(event: ChangeEvent<HTMLInputElement>): void =>
              setForm({
                ...form,
                [field.key || field.name]: event.target.value
              })
            }
          />
        </div>
      ))}
      <Button color="#fff">{template.submit}</Button>
    </form>
  );
};

export default Form;
