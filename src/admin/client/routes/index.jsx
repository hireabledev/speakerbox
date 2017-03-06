import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRedirect from 'react-router/lib/IndexRedirect';

import NotFoundPage from '../components/not-found';
import App from '../components/app';
import ListPage from '../components/list';
import CreatePage from '../components/create';
import EditPage from '../components/edit';
import DeletePage from '../components/delete';
import DetailPage from '../components/detail';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="models/users" />
    <Route path="models/:modelName" component={ListPage} />
    <Route path="models/:modelName/new" component={CreatePage} />
    <Route path="models/:modelName/:id" component={DetailPage} />
    <Route path="models/:modelName/:id/edit" component={EditPage} />
    <Route path="models/:modelName/:id/delete" component={DeletePage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
