/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const Upload = sequelize.define('Upload', {
  id:                   {
                          type: Sequelize.STRING,
                          defaultValue: Sequelize.UUIDV4,
                          allowNull: false,
                          primaryKey: true,
                          comment: 'Upload ID.',
                        },
  title:                {
                          type: Sequelize.TEXT,
                          defaultValue: Sequelize.NOW,
                          comment: 'Upload title.',
                        },
  url:                  {
                          type: Sequelize.TEXT,
                          allowNull: false,
                          comment: 'Upload URL.',
                        },
  type:                 {
                          type: Sequelize.STRING,
                          defaultValue: 'image',
                          allowNull: false,
                          validate: {
                            isIn: [['image', 'video', 'audio']],
                          },
                          comment: 'Upload type.',
                        },
}, {
  name: {
    singular: 'upload',
    plural: 'uploads',
  },
});

export default Upload;
