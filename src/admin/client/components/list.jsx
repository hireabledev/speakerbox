import React, { Component, PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import Fallback from 'lib/client/components/fallback';
import startCase from 'lodash/startCase';
import kebabCase from 'lodash/kebabCase';
import fetch from 'lib/fetch';
import { getModel } from '../models';
import Page, { PageTitle } from './page';
import Table from './table';

export default class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      moreItems: true,
    };
    this.fetchItems = this.fetchItems.bind(this);
    this.resetItems = this.resetItems.bind(this);
  }

  componentDidMount() {
    this.fetchItems();
  }

  componentDidUpdate(prevProps) {
    const differentPath = prevProps.location.pathname !== this.props.location.pathname;
    if (differentPath) {
      this.resetItems();
      setTimeout(() => {
        this.fetchItems();
      });
    }
  }

  async fetchItems() {
    const { items } = this.state;
    const { modelName } = this.props.routeParams;
    const res = await fetch(`/api/${kebabCase(modelName)}`, {
      query: {
        user: 'all',
        skip: items.length,
        ...this.props.location.query,
      },
    });
    const { data, more } = res.body;
    this.setState({
      items: items.concat(data),
      moreItems: more,
    });
  }

  resetItems() {
    this.setState({
      items: [],
      moreItems: true,
    });
  }

  render() {
    const { items, moreItems } = this.state;
    const { modelName } = this.props.routeParams;
    const model = getModel(modelName);
    return (
      <Page bg="light" padY>
        <PageTitle flush={items.length !== 0}>{startCase(model.plural)}</PageTitle>
        <Fallback if={items.length === 0}>
          No items. <Link to={`/models/${modelName}/new`}>Add one</Link>?
        </Fallback>
        {items.length === 0 ? null : (
          <Table
            loadMore={this.fetchItems}
            hasMore={moreItems}
            items={items}
            model={model}
          />
        )}
      </Page>
    );
  }
}

ListPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
    query: PropTypes.object,
  }).isRequired,
  routeParams: PropTypes.shape({
    modelName: PropTypes.string.isRequired,
  }).isRequired,
};
