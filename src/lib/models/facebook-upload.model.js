/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize from '../sequelize';

const FacebookUpload = sequelize.define('FacebookUpload', {
}, {
  name: {
    singular: 'facebookUpload',
    plural: 'facebookUploads',
  },
});

export default FacebookUpload;
