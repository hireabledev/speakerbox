import React, { PropTypes } from 'react';
import moment from 'moment';
import cn from 'classnames';

const DATE_FORMATS = [moment.ISO_8601, 'YYYY-MM-DD HH:m:s.SSS ZZ'];

export default function DisplayDate({ className, date, format }) {
  const m = moment(date, DATE_FORMATS);
  return (
    <time
      className={cn('display-date', className)}
      dateTime={m.toISOString()}
      title={m.format(format)}
    >
      {m.fromNow()}
    </time>
  );
}

DisplayDate.propTypes = {
  className: PropTypes.string,
  date: PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string,
  ]).isRequired,
  format: PropTypes.string,
};

DisplayDate.defaultProps = {
  format: 'lll',
};
