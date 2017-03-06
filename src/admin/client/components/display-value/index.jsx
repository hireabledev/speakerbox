import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import Icon from 'lib/client/components/icon';
import moment from 'moment';
import { parse as parseUrl } from 'url';
import { isUri } from 'valid-url';
import { getModel } from '../../models';

const icons = {
  facebook: 'facebook',
  twitter: 'twitter',
  linkedin: 'linkedin',
  rss: 'rss',
};

export default function DisplayValue(props) {
  const { schema, value, shortenValues, showEmpty } = props;
  // empty values
  if (value == null) {
    if (value === null && showEmpty) {
      return <Icon name="remove" />;
    }
    return null;
  }
  // booleans
  if (typeof value === 'boolean') {
    if (value === true) {
      return <Icon name="check" title="true" />;
    } else if (value === false) {
      return <Icon name="times" title="false" />;
    }
  }
  // id
  if (schema.type === 'id') {
    const model = getModel(schema.model);
    return (
      <Link to={`/models/${model.plural}/${value}`}>
        {shortenValues ? `${value.substr(0, 6)}…` : value}
      </Link>
    );
  }
  // dates
  if (schema.type === 'date') {
    const date = moment(value);
    return <time dateTime={value} title={value}>{date.format('lll')}</time>;
  }
  // urls
  if (isUri(value)) {
    const { host } = parseUrl(value);
    return (
      <a href={value} target="_blank" rel="noopener noreferrer" title={value}>
        {shortenValues ? `${host}…` : value}
      </a>
    );
  }
  // icons
  if (icons[value]) {
    return <Icon name={value} title={value} />;
  }
  // objects
  if (typeof value === 'object') {
    try {
      return <pre>{JSON.stringify(value, null, 2)}</pre>;
    } catch (e) {
      return <span>{value.toString()}</span>;
    }
  }
  // strings
  if (typeof value === 'string') {
    return (
      <span title={value.length > 160 ? value : null}>
        {shortenValues ? value.substr(0, 160) : value}
      </span>
    );
  }
  return <span>{value}</span>;
}

DisplayValue.propTypes = {
  schema: PropTypes.shape({
    type: PropTypes.string,
  }).isRequired,
  value: PropTypes.any,
  shortenValues: PropTypes.bool,
  showEmpty: PropTypes.bool,
};

DisplayValue.defaultProps = {
  shortenValues: false,
  showEmpty: false,
};
