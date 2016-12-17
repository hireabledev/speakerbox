/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize from '../sequelize';

const LinkedInUpload = sequelize.define('LinkedInUpload', {
}, {
  name: {
    singular: 'linkedInUpload',
    plural: 'linkedInUploads',
  },
});

export default LinkedInUpload;
