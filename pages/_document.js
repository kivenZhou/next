import Document, { Head, Main, NextScript } from 'next/document'

export default class extends Document {
  render () {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0" />
          <link rel="shortcut icon" href="//static.xinxindai.com/pc/1.0.18/build/css/i/favicon.ico" />
          <link rel="Bookmark" href="//static.xinxindai.com/pc/1.0.18/build/css/i/favicon.ico" />
          <link rel='stylesheet' type='text/css' href='//unpkg.com/antd-mobile/dist/antd-mobile.min.css' />
        </Head>
        <body style={{margin: 0}}>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}