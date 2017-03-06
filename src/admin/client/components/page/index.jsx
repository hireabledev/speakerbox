import React, { PropTypes } from 'react';
import Page from 'lib/client/components/page';
import Menu from '../menu';

export default function AdminPage(props) {
  return (
    <Page
      {...props}
      menu={<Menu>{props.menu}</Menu>}
    />
  );
}

AdminPage.propTypes = {
  menu: PropTypes.node,
};

export { default as PageTitle } from 'lib/client/components/page/page-title';
