import React, { PropTypes } from 'react';
import cn from 'classnames';
import { SHOW_ADS, BANNER_PORTRAIT_L, BANNER_LANDSCAPE_L } from 'lib/client/constants';

// eslint-disable max-len
const bannerMap = {
  portrait: {
    lg: <iframe src={BANNER_PORTRAIT_L} width="120" height="600" scrolling="no" marginWidth="0" style={{ border: 'none' }} frameBorder="0" />,
  },
  landscape: {
    lg: <iframe src={BANNER_LANDSCAPE_L} width="468" height="60" scrolling="no" marginWidth="0" style={{ border: 'none' }} frameBorder="0" />,
  },
};
// eslint-enable max-len

export default function Banner({ className, size, layout, waypoint }) {
  if (SHOW_ADS) {
    return (
      <div className={cn('sb-bn', className)}>
        {waypoint}
        {bannerMap[layout][size]}
      </div>
    );
  }
  if (waypoint) {
    return (
      <div className={cn('sb-bn sb-bn-empty', className)}>
        {waypoint}
      </div>
    );
  }
  return null;
}

Banner.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf([
    'lg',
  ]),
  layout: PropTypes.oneOf([
    'portrait',
    'landscape',
  ]),
  waypoint: PropTypes.node,
};

Banner.defaultProps = {
  size: 'lg',
  layout: 'landscape',
};
