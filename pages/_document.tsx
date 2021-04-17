import Document, { Html, Head, Main, NextScript } from 'next/document';

const GA_SCRIPT = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${process.env.GA_ID}');
`;

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render(): JSX.Element {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap"
            rel="stylesheet"
          />
          <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-1R25K5SR16"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: GA_SCRIPT,
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          {/* <footer>
            Ikony wykonane przez{' '}
            <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
              Freepik
            </a>{' '}
            (źródło{' '}
            <a href="https://www.flaticon.com/" title="Flaticon">
              www.flaticon.com
            </a>
            ). Wszystkie zdjęcia użyte na stronie są na licencji Creative
            Common.
          </footer> */}
        </body>
      </Html>
    );
  }
}

export default MyDocument;
