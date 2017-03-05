import React, { Component } from 'react';
import Link from 'react-router/lib/Link';
import Page, { PageTitle } from './page';

export default class MetricsPage extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Page bg="light" padY>
        <PageTitle>Not Found</PageTitle>
        <Link to="/" className="btn btn-primary">
          Home
        </Link>
      </Page>
    );
  }
}

MetricsPage.propTypes = {
};
