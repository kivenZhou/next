import React, { Component } from 'react'
import Head from 'next/head'
import Header from '../components/cnode/Header'
import cnodeScss from '../static/css/cnode.scss'

export default class Headers extends Component {
    constructor() {
        super()
    }
    onLeftClick() {
        console.log('leftback')
    }
    render() {
        return (
            <div>
                <Head>
                    <link rel='stylesheet' type='text/css' href='../../static/css/public.css' />
                    <style dangerouslySetInnerHTML={{ __html: cnodeScss }} />
                </Head>
                <Header title={ this.props.title } show={ this.props.show } />
            </div>
        )
    }
}