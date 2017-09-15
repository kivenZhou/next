import React, { Component } from 'react'
import Link from 'next/link'
import server from '../server/index'

export default class Demo extends Component {
    static async getInitialProps() {
        const resJson = await server.consumeList(1)
        return {
          shows: resJson.items
        }
    }
    render() {
      console.log(this.props.shows)
      return (
        <div>
          <ul>
            {
              this.props.shows.map((show)=>{
                return (
                  <li key={show.id}>{show.bidName}</li>
                )
              })
            }
          </ul>
        </div>
      )
    }
}