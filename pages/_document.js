import Document, { Head, Main, NextScript } from 'next/document'
export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const props = await Document.getInitialProps(ctx)
    return { ...props }
  }
  render () {
    return (
     <html>
       <Head>
         <meta name="viewport" content="width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=0" />
         <link rel='stylesheet' type='text/css' href='/static/css/antd-mobile.min.css' />
         <style>{`body { margin: 0 } /* custom! */`}</style>
       </Head>
       <body className="custom_class">
         {this.props.customValue}
         <Main />
         <NextScript />
       </body>
     </html>
    )
  }
}