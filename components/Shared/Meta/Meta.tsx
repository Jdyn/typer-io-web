import Head from 'next/head';

interface Props {
  title: string;
  ogTitle?: string;
  description: string;
}

const Meta = ({ title, description, ogTitle }: Props): JSX.Element => {
  return (
    <Head>
      <title>{`Typer - ${title}`}</title>
      <link
        rel="icon"
        href="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/microsoft/209/racing-car_1f3ce.png"
      />
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=5"
      />
      <meta
        name="og:description"
        content={
          description ||
          'Typer is a fast and modern multiplayer typing competition. Type against your friends in large 50+ player matches with a few clicks.'
        }
      />
      <meta property="og:title" content={ogTitle} />
    </Head>
  );
};

Meta.defaultProps = {
  ogTitle: ''
};

export default Meta;
