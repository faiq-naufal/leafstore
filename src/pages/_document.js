import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head></Head>
        <noscript>You need to enable javascript to run this app</noscript>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
