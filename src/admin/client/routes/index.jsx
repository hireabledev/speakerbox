import React from 'react';
import Route from 'react-router/lib/Route';
import IndexRedirect from 'react-router/lib/IndexRedirect';

import NotFoundPage from '../components/not-found';
import App from '../components/app';
import ListPage from '../components/list';
import CreatePage from '../components/create';
import EditPage from '../components/edit';
import DetailPage from '../components/detail';

export default (
  <Route path="/" component={App}>
    <IndexRedirect to="models/users" />
    <Route path="models/:model" component={ListPage} />
    <Route path="models/:model/new" component={CreatePage} />
    <Route path="models/:model/:id" component={DetailPage} />
    <Route path="models/:model/:id/edit" component={EditPage} />
    <Route path="*" component={NotFoundPage} />
  </Route>
);
