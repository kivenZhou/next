import React, { Component } from 'react'
import Head from 'next/head'
import Header from '../components/consume/Header'
import consumeScss from '../static/css/consume.scss'

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
                    <style dangerouslySetInnerHTML={{ __html: consumeScss }} />
                </Head>
                <Header title={ this.props.title } />
            </div>
        )
    }
}