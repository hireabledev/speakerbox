import React, { Component, PropTypes } from 'react';
import startCase from 'lodash/startCase';
import kebabCase from 'lodash/kebabCase';
import withRouter from 'react-router/lib/withRouter';
import fetch from 'lib/fetch';
import Subnav, { SubnavLink } from 'lib/client/components/subnav';
import Page, { PageTitle } from './page';
import { getModel } from '../models';

export class DeletePage extends Component {
  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  async onDelete() {
    const { modelName, id } = this.props.routeParams;
    await fetch(`/api/${kebabCase(modelName)}/${id}`, {
      query: { user: 'all' },
      method: 'DELETE',
    });
    this.props.router.push(`/models/${modelName}`);
  }

  render() {
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
        <PageTitle>Delete {startCase(model.name)}</PageTitle>
        <p>
          Are you sure you wish to delete the <b>{model.name}</b> with id <b>{id}</b>?
        </p>
        <button
          onClick={this.onDelete}
          className="btn btn-danger"
          type="button"
        >
          Delete
        </button>
      </Page>
    );
  }
}

DeletePage.propTypes = {
  routeParams: PropTypes.shape({
    modelName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(DeletePage);
