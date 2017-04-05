import './styles.scss';

document.addEventListener('click', e => {
  if (e.target.href) {
    mixpanel.track('Visitor clicked SSO link', {
      text: e.target.textContent.trim(),
      url: e.target.href,
    });
  }
});
