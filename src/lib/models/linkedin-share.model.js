/* eslint key-spacing: 0, indent: 0, new-cap: 0 */

import sequelize, { Sequelize } from '../sequelize';

const LinkedInShare = sequelize.define('LinkedInShare', {
  id:                   {
                          type: Sequelize.STRING,
                          allowNull: false,
                          primaryKey: true,
                          comment: 'LinkedIn share ID.',
                        },
  date:                 {
                          type: Sequelize.DATE,
                          allowNull: false,
                          defaultValue: Sequelize.NOW,
                          comment: 'LinkedIn share date.',
                        },
  contentTitle:         {
                          type: Sequelize.STRING,
                          comment: 'LinkedIn share content title.',
                        },
  contentDescription:   {
                          type: Sequelize.STRING,
                          comment: 'LinkedIn share content description.',
                        },
  contentUrl:           {
                          type: Sequelize.STRING,
                          comment: 'LinkedIn share content submitted URL.',
                        },
  contentImgUrl:        {
                          type: Sequelize.STRING,
                          comment: 'LinkedIn share content submitted image URL.',
                        },
  comment:              {
                          type: Sequelize.STRING,
                          comment: 'LinkedIn share comment.',
                        },
  visibility:         {
                          type: Sequelize.STRING,
                          defaultValue: 'anyone',
                          allowNull: false,
                          validate: {
                            isIn: [['anyone', 'connections-only']],
                          },
                          comment: 'LinkedIn share visibility.',
                        },
  jobId:                {
                          type: Sequelize.STRING,
                          allowNull: false,
                          comment: 'Kue job ID.',
                        },
}, {
  name: {
    singular: 'linkedInShare',
    plural: 'linkedInShares',
  },
});

export default LinkedInShare;
