/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize from '../sequelize';

const LinkedinUpload = sequelize.define('LinkedinUpload', {
}, {
  name: {
    singular: 'linkedinUpload',
    plural: 'linkedinUploads',
  },
});

export default LinkedinUpload;
