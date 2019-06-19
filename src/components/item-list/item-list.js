import React, { Component } from 'react';

import Spinner from '../spinner';

import './item-list.css';

export default class ItemList extends Component {

  state = {
    itemList: null,
  };

  componentDidMount() {

    const { getData } = this.props;

    getData()
      .then((itemList) => this.setState({ itemList }))
      .catch((error) => console.log(error));
  }

  renderItems(arr) {
    return arr.map(({ id, name }) => {
      return (
        <li
          className='list-group-item'
          key={ id }
          onClick={ () => this.props.onItemSelected(id) }
        >
          { name }
        </li>
      )
    })
  }

  render() {
    const { itemList } = this.state;
    const items = this.renderItems(itemList || []);

    if (!itemList) {
      return <Spinner />;
    }

    return (
      <ul className='item-list list-group'>
        { items }
      </ul>
    );
  }
}