import React, { PropTypes } from 'react';
import Page from 'lib/client/components/page';
import Menu from '../menu';

export { PageTitle } from 'lib/client/components/page';

export default function DashboardPage(props) {
  return (
    <Page
      {...props}
      menu={<Menu>{props.menu}</Menu>}
    />
  );
}

DashboardPage.propTypes = {
  menu: PropTypes.node,
};
