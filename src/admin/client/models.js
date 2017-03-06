const account = {
  name: 'account',
  plural: 'accounts',
  fields: [
    {
      key: 'id',
      type: 'id',
      model: 'account',
      required: true,
      editable: false,
    },
    {
      key: 'type',
      type: 'radio',
      required: true,
      choices: [
        { label: 'Facebook', value: 'facebook' },
        { label: 'Twitter', value: 'twitter' },
        { label: 'LinkedIn', value: 'linkedin' },
      ],
    },
    {
      key: 'name',
      type: 'text',
      required: true,
    },
    {
      key: 'imgUrl',
      type: 'text',
    },
    {
      key: 'synced',
      type: 'date',
      editable: false,
    },
    {
      key: 'userId',
      type: 'id',
      model: 'user',
      required: true,
    },
  ],
};

const feed = {
  name: 'feed',
  plural: 'feeds',
  fields: [
    {
      key: 'id',
      type: 'id',
      model: 'feed',
      required: true,
      editable: false,
    },
    {
      key: 'name',
      type: 'text',
      required: true,
    },
    {
      key: 'url',
      type: 'text',
      required: true,
    },
    {
      key: 'synced',
      type: 'date',
      editable: false,
    },
    {
      key: 'userId',
      type: 'id',
      model: 'user',
      required: true,
    },
  ],
};

const post = {
  name: 'post',
  plural: 'posts',
  fields: [
    {
      key: 'id',
      type: 'id',
      model: 'post',
      required: true,
      editable: false,
    },
    {
      key: 'type',
      type: 'radio',
      required: true,
      choices: [
        { label: 'Facebook', value: 'facebook' },
        { label: 'Twitter', value: 'twitter' },
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'RSS', value: 'rss' },
      ],
    },
    {
      key: 'favorited',
      type: 'date',
    },
    {
      key: 'date',
      type: 'date',
      required: true,
    },
    {
      key: 'url',
      type: 'text',
      required: true,
    },
    {
      key: 'message',
      type: 'textarea',
      required: true,
    },
    {
      key: 'authorName',
      type: 'text',
    },
    {
      key: 'authorUrl',
      type: 'text',
    },
    {
      key: 'authorImgUrl',
      type: 'text',
    },
    {
      key: 'feedId',
      type: 'id',
      model: 'feed',
    },
    {
      key: 'accountId',
      type: 'id',
      model: 'account',
    },
    {
      key: 'nativeId',
      type: 'text',
      editable: false,
    },
    {
      key: 'data',
      type: 'text',
      editable: false,
    },
  ],
};

const scheduledPost = {
  name: 'scheduledPost',
  plural: 'scheduledPosts',
  fields: [
    {
      key: 'id',
      type: 'id',
      model: 'scheduledPost',
      required: true,
      editable: false,
    },
    {
      key: 'type',
      type: 'radio',
      required: true,
      choices: [
        { label: 'Facebook', value: 'facebook' },
        { label: 'Twitter', value: 'twitter' },
        { label: 'LinkedIn', value: 'linkedin' },
      ],
    },
    {
      key: 'posted',
      type: 'date',
      editable: false,
    },
    {
      key: 'url',
      type: 'text',
    },
    {
      key: 'date',
      type: 'date',
      required: true,
    },
    {
      key: 'message',
      type: 'textarea',
    },
    {
      key: 'imgUrl',
      type: 'text',
    },
    {
      key: 'accountId',
      type: 'id',
      model: 'account',
      required: true,
    },
    {
      key: 'postId',
      type: 'id',
      model: 'post',
    },
    {
      key: 'data',
      type: 'text',
      editable: false,
    },
  ],
};

const upload = {
  name: 'upload',
  plural: 'uploads',
  fields: [
    {
      key: 'id',
      type: 'id',
      model: 'upload',
      required: true,
      editable: false,
    },
    {
      key: 'title',
      type: 'text',
    },
    {
      key: 'url',
      type: 'text',
      required: true,
    },
    {
      key: 'type',
      type: 'radio',
      required: true,
      choices: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
        { label: 'Audio', value: 'audio' },
      ],
    },
    {
      key: 'userId',
      type: 'id',
      model: 'user',
      required: true,
    },
  ],
};

const user = {
  name: 'user',
  plural: 'users',
  fields: [
    {
      key: 'id',
      type: 'id',
      model: 'user',
      required: true,
    },
    {
      key: 'displayName',
      type: 'text',
      required: true,
    },
    {
      key: 'role',
      type: 'radio',
      required: true,
      choices: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
    },
    {
      key: 'imgUrl',
      type: 'text',
      required: true,
    },
    {
      key: 'email',
      type: 'email',
    },
    {
      key: 'emailConfirmed',
      type: 'boolean',
      editable: false,
    },
    {
      key: 'tel',
      type: 'tel',
    },
    {
      key: 'telConfirmed',
      type: 'boolean',
      editable: false,
    },
  ],
};

const models = {
  account,
  feed,
  post,
  scheduledPost,
  upload,
  user,
};

export default models;

export function getModel(name) {
  return models[name] || models[name.replace(/s$/, '')];
}
