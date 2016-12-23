/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize from '../sequelize';

const TwitterUpload = sequelize.define('TwitterUpload', {
  // props added by sequelize
}, {
  name: {
    singular: 'twitterUpload',
    plural: 'twitterUploads',
  },
});

export default TwitterUpload;
