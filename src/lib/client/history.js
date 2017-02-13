import { createHistory } from 'history';
import { useRouterHistory } from 'react-router';

export default useRouterHistory(createHistory)({
  basename: document.baseURI.substr(window.location.origin.length),
});
