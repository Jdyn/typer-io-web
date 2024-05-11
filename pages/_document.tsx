import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript
} from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head>
          {/* <script
            data-ad-client="ca-pub-3148839588626786"
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          /> */}
          <meta
            name="keywords"
            content="typer,typing,typerio,race with friends,free typing games,typing,typing test,wpm,typing software,typing game,typing practice,free typing program,best typing game,typing skills,free typing test"
          />
          <meta
            name="google-site-verification"
            content="Pww56fm4UvyzFeLppncS1u27xlhznlaFsSzwpVrtbqE"
          />
          <meta
            property="og:description"
            content="Typer is a fast and modern multiplayer typing competition. Type against your friends in large 50+ player matches with a few clicks."
          />
        </Head>
        <body id="body">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
