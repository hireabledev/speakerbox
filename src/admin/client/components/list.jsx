import React, { Component, PropTypes } from 'react';
import omit from 'lodash/omit';
import Link from 'react-router/lib/Link';
import withRouter from 'react-router/lib/withRouter';
import Fallback from 'lib/client/components/fallback';
import startCase from 'lodash/startCase';
import kebabCase from 'lodash/kebabCase';
import fetch from 'lib/fetch';
import Subnav from 'lib/client/components/subnav';
import { SelectAccount, SelectFeed, SelectPost, SelectUser } from './select';
import { getModel } from '../models';
import Page, { PageTitle } from './page';
import Table from './table';

export class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      moreItems: true,
    };
    this.fetchItems = this.fetchItems.bind(this);
    this.resetItems = this.resetItems.bind(this);
    this.bindOnFilter = this.bindOnFilter.bind(this);
    this.onFilter = this.onFilter.bind(this);
  }

  componentDidMount() {
    this.fetchItems();
  }

  componentDidUpdate(prevProps) {
    const differentPath = prevProps.location.pathname !== this.props.location.pathname;
    const prevQuery = JSON.stringify(prevProps.location.query);
    const nextQuery = JSON.stringify(this.props.location.query);
    const differentQuery = prevQuery !== nextQuery;
    if (differentPath || differentQuery) {
      this.resetItems(() => this.fetchItems());
    }
  }

  onFilter(model, selection) {
    const query = omit(this.props.location.query, model);
    if (selection) {
      query[model] = selection.value;
    }
    this.props.router.push({
      pathname: this.props.location.pathname,
      query,
    });
  }

  bindOnFilter(modelName) {
    return (...args) => this.onFilter.call(this, modelName, ...args);
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

  resetItems(done = () => {}) {
    this.setState({
      items: [],
      moreItems: true,
    }, done);
  }

  render() {
    const { items, moreItems } = this.state;
    const { modelName } = this.props.routeParams;
    const model = getModel(modelName);
    return (
      <Page
        bg="light"
        padY
        subnav={
          <Subnav>
            {model.fields
              .filter(field => (field.type === 'id' && field.model !== model.name))
              .map(field => {
                switch (field.model) {
                  case 'account':
                    return (
                      <SelectAccount
                        key={field.key}
                        value={this.props.location.query[field.key]}
                        onChange={this.bindOnFilter(field.key)}
                      />
                    );
                  case 'feed':
                    return (
                      <SelectFeed
                        key={field.key}
                        value={this.props.location.query[field.key]}
                        onChange={this.bindOnFilter(field.key)}
                      />
                    );
                  case 'posts':
                    return (
                      <SelectPost
                        key={field.key}
                        value={this.props.location.query[field.key]}
                        onChange={this.bindOnFilter(field.key)}
                      />
                    );
                  default:
                    return null;
                }
              })
            }
            <SelectUser
              value={this.props.location.query.user}
              onChange={this.bindOnFilter('user')}
            />
          </Subnav>
        }
      >
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
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(ListPage);
