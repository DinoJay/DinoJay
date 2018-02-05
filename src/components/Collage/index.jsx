import React, { Component } from 'react';
import PropTypes from 'prop-types';
import prune from 'json-prune';

import * as d3 from 'd3';
import Collage from './Collage';

import { ajax, wait } from '../utils/promises';
import defaultData from './data.json';

class CollageContainer extends Component {
  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    lessData: PropTypes.bool
  };

  constructor(props) {
    super(props);
    this.state = { data: [], loadingText: 'Loading Images' };
  }

  componentDidMount() {
    const url = `https://api.instagram.com/v1/users/self/media/recent/?access_token=${
      process.env.InstagramAccessToken
    }&count=20`;

    const { lessData } = this.props;

    const allData = [];
    d3
      // TODO: wait promise does not really work
      .range(0, lessData ? 3 : 4)
      .reduce(
        pacc =>
          pacc.then(rawData => {
            allData.push(...rawData.data);
            return ajax({
              url: rawData.pagination.next_url,
              type: 'GET',
              dataType: 'jsonp',
              // cache: false,
              timeout: 2000
            }).catch(err => console.log('err', err));
          }),
        ajax({
          url,
          type: 'GET',
          dataType: 'jsonp',
          // cache: false,
          timeout: 2000
        }).catch((err, arg) => console.log('err', err, arg))
      )
      .then(data => {
        // const resultStr = prune(allData);
        // window.open(
        //   `data:text/json,${encodeURIComponent(resultStr)}`,
        //   '_blank'
        // );
        // console.log('allData', allData);
        this.setState({ data: allData });
      })
      .catch(err => {
        console.log('err', err);
        this.setState({
          loadingText: 'Error fetching data, loading old images'
        });
        setTimeout(() => this.setState({ data: defaultData }), 2000);
      });
  }

  render() {
    const { data, loadingText } = this.state;
    const { height } = this.props;
    if (data.length === 0)
      return (
        <h1 className="centered" style={{ lineHeight: `${height}px` }}>
          {loadingText}
        </h1>
      );

    return <Collage {...this.props} data={data} />;
  }
}

export default CollageContainer;
