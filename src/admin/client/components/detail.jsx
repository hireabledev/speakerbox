import React, { Component, PropTypes } from 'react';
import startCase from 'lodash/startCase';
import kebabCase from 'lodash/kebabCase';
import fetch from 'lib/fetch';
import DisplayValue from './display-value';
import Page, { PageTitle } from './page';
import { getModel } from '../models';

export default class DetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: null,
    };
    this.fetchItem = this.fetchItem.bind(this);
  }

  componentDidMount() {
    this.fetchItem();
  }

  async fetchItem() {
    const { model, id } = this.props.routeParams;
    const { body } = await fetch(`/api/${kebabCase(model)}/${id}`);
    this.setState({ item: body });
  }

  render() {
    const { item } = this.state;
    const model = getModel(this.props.routeParams.model);
    return (
      <Page bg="light" padY>
        <PageTitle>{startCase(model.name)}</PageTitle>
        {Object.keys(model.fields).map(field => (
          <div className="mb-4">
            <h6 className="text-muted text-uppercase">{startCase(field)}</h6>
            <DisplayValue
              fieldName={field}
              fieldModel={model.fields[field]}
              value={item && item[field]}
              shortenValues={false}
              showEmpty
            />
          </div>
        ))}
      </Page>
    );
  }
}

DetailPage.propTypes = {
  routeParams: PropTypes.shape({
    model: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};
