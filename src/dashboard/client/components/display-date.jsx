import React, { PropTypes } from 'react';
import moment from 'moment';
import cn from 'classnames';

export default function DisplayDate({ className, date, format }) {
  const m = moment(date);
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
  date: PropTypes.instanceOf(Date).isRequired,
  format: PropTypes.string,
};

DisplayDate.defaultProps = {
  format: 'lll',
};
