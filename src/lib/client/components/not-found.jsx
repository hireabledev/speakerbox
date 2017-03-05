import React from 'react';
import Page, { PageTitle } from 'lib/client/components/page';

export default function NotFoundPage() {
  return (
    <Page bg="light" padY>
      <PageTitle>Not Found</PageTitle>
      <p>Please go back to the home page and try again.</p>
    </Page>
  );
}
