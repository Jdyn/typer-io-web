import Layout from '../components/Layout';

interface Props {
  statusCode: number;
}

const Error = ({ statusCode }: Props): JSX.Element => {
  return (
    <Layout striped>
      <main
        style={{
          display: 'flex',
          margin: '145px 0 0 0',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <h1>Oops, a {statusCode} error has occured.</h1>
        <p>The page you are looking for could not be found.</p>
      </main>
    </Layout>
  );
};

Error.getInitialProps = ({ res, err }): object => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  return { statusCode };
};

export default Error;
