const account = {
  name: 'account',
  plural: 'accounts',
  fields: {
    id: {
      type: 'id',
      model: 'account',
      required: true,
    },
    type: {
      type: 'radio',
      required: true,
      choices: [
        { label: 'Facebook', value: 'facebook' },
        { label: 'Twitter', value: 'twitter' },
        { label: 'LinkedIn', value: 'linkedin' },
      ],
    },
    name: {
      type: 'text',
      required: true,
    },
    imgUrl: {
      type: 'text',
    },
  },
};

const feed = {
  name: 'feed',
  plural: 'feeds',
  fields: {
    id: {
      type: 'id',
      model: 'feed',
      required: true,
    },
    name: {
      type: 'text',
      required: true,
    },
    url: {
      type: 'text',
      required: true,
    },
  },
};

const post = {
  name: 'post',
  plural: 'posts',
  fields: {
    id: {
      type: 'id',
      model: 'post',
      required: true,
    },
    type: {
      type: 'radio',
      required: true,
      choices: [
        { label: 'Facebook', value: 'facebook' },
        { label: 'Twitter', value: 'twitter' },
        { label: 'LinkedIn', value: 'linkedin' },
        { label: 'RSS', value: 'rss' },
      ],
    },
    favorited: {
      type: 'date',
    },
    date: {
      type: 'date',
      required: true,
    },
    url: {
      type: 'text',
      required: true,
    },
    message: {
      type: 'text',
      required: true,
    },
    authorName: {
      type: 'text',
    },
    authorUrl: {
      type: 'text',
    },
    authorImgUrl: {
      type: 'text',
    },
    feedId: {
      type: 'id',
      model: 'feed',
    },
    accountId: {
      type: 'id',
      model: 'account',
    },
    nativeId: {
      type: 'text',
      editable: false,
    },
    data: {
      type: 'text',
    },
  },
};

const scheduledPost = {
  name: 'scheduledPost',
  plural: 'scheduledPosts',
  fields: {
    id: {
      type: 'id',
      model: 'scheduledPost',
      required: true,
    },
    type: {
      type: 'radio',
      required: true,
      choices: [
        { label: 'Facebook', value: 'facebook' },
        { label: 'Twitter', value: 'twitter' },
        { label: 'LinkedIn', value: 'linkedin' },
      ],
    },
    posted: {
      type: 'date',
    },
    date: {
      type: 'date',
      required: true,
    },
    message: {
      type: 'text',
    },
    imgUrl: {
      type: 'text',
    },
    url: {
      type: 'text',
    },
    data: {
      type: 'text',
    },
  },
};

const upload = {
  name: 'upload',
  plural: 'uploads',
  fields: {
    id: {
      type: 'id',
      model: 'upload',
      required: true,
    },
    title: {
      type: 'text',
    },
    url: {
      type: 'text',
      required: true,
    },
    type: {
      type: 'radio',
      required: true,
      choices: [
        { label: 'Image', value: 'image' },
        { label: 'Video', value: 'video' },
        { label: 'Audio', value: 'audio' },
      ],
    },
  },
};

const user = {
  name: 'user',
  plural: 'users',
  fields: {
    id: {
      type: 'id',
      model: 'user',
      required: true,
    },
    displayName: {
      type: 'text',
      required: true,
    },
    role: {
      type: 'radio',
      required: true,
      choices: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
    },
    imgUrl: {
      type: 'text',
      required: true,
    },
    email: {
      type: 'text',
    },
    emailConfirmed: {
      type: 'boolean',
    },
    tel: {
      type: 'text',
    },
    telConfirmed: {
      type: 'boolean',
    },
  },
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
