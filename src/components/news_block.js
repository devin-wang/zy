/**
 * Created by Administrator on 2017/9/5.
 */
import React, {Component} from 'react'
import {
  Card
} from 'antd'
import {Link} from 'react-router'
import axios from 'axios'

export default class NewsBlock extends Component {

  static propTypes = {
    type: React.PropTypes.string.isRequired,
    count: React.PropTypes.number.isRequired,
  }

  constructor (props) {
    super(props)
    this.state = {
      newsArr: []
    }
  }

  componentDidMount () {
    const {type, count} = this.props
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=${type}&count=${count}`
    axios.get(url)
      .then(response => {
        const newsArr = response.data
        this.setState({newsArr})
      })
  }

  render () {
    const {newsArr} = this.state
    const newsList = newsArr.length
      ? newsArr.map((news, index) => (
        <li key={index}>
          <Link to={`detail/${news.uniquekey}`}>
            {news.title}
          </Link>
        </li>
      ))
      : '没有任何新闻'
    return (
      <Card className="topNewsList">
        <ul>{newsList}</ul>
      </Card>
    )
  }
}
