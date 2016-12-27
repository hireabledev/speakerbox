import React, { Component } from 'react';
import Page, { PageTitle } from 'lib/components/page';

export default class MetricsPage extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <Page bg="light" padY>
        <PageTitle>Metrics</PageTitle>
        <p>Coming soon!</p>
      </Page>
    );
  }
}

MetricsPage.propTypes = {
};
