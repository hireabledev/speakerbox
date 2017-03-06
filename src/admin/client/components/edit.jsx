import React, { Component, PropTypes } from 'react';
import startCase from 'lodash/startCase';
import kebabCase from 'lodash/kebabCase';
import pick from 'lodash/pick';
import fetch from 'lib/fetch';
import withRouter from 'react-router/lib/withRouter';
import Subnav, { SubnavLink } from 'lib/client/components/subnav';
import { getModel } from '../models';
import Page, { PageTitle } from './page';
import ModelForm from './form';

export class EditPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {},
    };
    this.fetchItem = this.fetchItem.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.fetchItem();
  }

  onChange(value, key) {
    this.setState({
      form: Object.assign({}, this.state.form, {
        [key]: value,
      }),
    });
  }

  async onSubmit(e) {
    e.preventDefault();
    const { modelName, id } = this.props.routeParams;
    const model = getModel(modelName);
    const editableFields = model.fields.filter(field => field.editable !== false);
    const editableValues = pick(this.state.form, editableFields.map(field => field.key));
    await fetch(`/api/${kebabCase(modelName)}/${id}`, {
      query: { user: 'all' },
      method: 'PATCH',
      body: editableValues,
    });
    this.props.router.push(`/models/${modelName}/${id}`);
  }

  async fetchItem() {
    const { modelName, id } = this.props.routeParams;
    const res = await fetch(`/api/${kebabCase(modelName)}/${id}`, {
      query: { user: 'all' },
    });
    this.setState({ form: res.body });
  }

  render() {
    const { form } = this.state;
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
        <PageTitle>Edit {startCase(model.name)}</PageTitle>
        <ModelForm
          name={model.name}
          fields={model.fields}
          values={form}
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      </Page>
    );
  }
}

EditPage.propTypes = {
  routeParams: PropTypes.shape({
    modelName: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default withRouter(EditPage);
