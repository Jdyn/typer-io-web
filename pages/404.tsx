import Layout from '../components/Layout';

const Error404 = () => {
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
        <h1>Oops, a 404 error has occured.</h1>
        <p>The page you are looking for could not be found.</p>
      </main>
    </Layout>
  );
};

export default Error404;
