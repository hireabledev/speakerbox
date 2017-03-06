import React from 'react';
import startCase from 'lodash/startCase';
import Menu from 'lib/client/components/menu';
import MenuLink from 'lib/client/components/menu/menu-link';
import models from '../../models';

const links = (
  <div>
    {Object.keys(models).map(modelName => {
      const model = models[modelName];
      return (
        <MenuLink key={modelName} className="sb-menu-link" to={`/models/${model.plural}`}>
          {startCase(model.plural)}
        </MenuLink>
      );
    })}
  </div>
);

export default function AdminMenu(props) {
  return (
    <Menu
      links={links}
      {...props}
    />
  );
}
