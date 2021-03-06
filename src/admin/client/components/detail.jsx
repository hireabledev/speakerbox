import React, { Component, PropTypes } from 'react';
import startCase from 'lodash/startCase';
import kebabCase from 'lodash/kebabCase';
import fetch from 'lib/fetch';
import Subnav, { SubnavLink } from 'lib/client/components/subnav';
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
    const { modelName, id } = this.props.routeParams;
    const res = await fetch(`/api/${kebabCase(modelName)}/${id}`, {
      query: { user: 'all' },
    });
    this.setState({ item: res.body });
  }

  render() {
    const { item } = this.state;
    const { modelName, id } = this.props.routeParams;
    const model = getModel(modelName);
    return (
      <Page
        bg="light"
        padY
        subnav={
          <Subnav>
            <SubnavLink to={`/models/${modelName}/${id}`}>
              View
            </SubnavLink>
            <SubnavLink to={`/models/${modelName}/${id}/edit`}>
              Edit
            </SubnavLink>
            <SubnavLink to={`/models/${modelName}/${id}/delete`}>
              Delete
            </SubnavLink>
          </Subnav>
        }
      >
        <PageTitle>{startCase(model.name)}</PageTitle>
        {model.fields.map(field => (
          <div key={field.key} className="mb-4">
            <h6 className="text-muted text-uppercase">{startCase(field.key)}</h6>
            <DisplayValue
              schema={field}
              value={item && item[field.key]}
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
    modelName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
};
