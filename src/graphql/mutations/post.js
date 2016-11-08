import { GraphQLNonNull, GraphQLBoolean, GraphQLString } from 'graphql';
import { attributeFields } from 'graphql-sequelize';
import omit from 'lodash/omit';
import Post from '../../lib/models/post.model';
import postType from '../types/post';

export const addPost = {
  type: postType,
  args: {
    ...attributeFields(Post, {
      commentToDescription: true,
      exclude: ['id', 'created', 'updated'],
    }),
    userId: { type: GraphQLString },
  },
  resolve(_, args, req) {
    const post = Post.build(args);
    post.setUser(req.user);
    return post.save();
  },
};

export const editPost = {
  type: postType,
  args: attributeFields(Post, {
    commentToDescription: true,
    exclude: ['created', 'updated'],
    allowNull: true,
  }),
  resolve(_, args, req) {
    return Post
      .scopeForUser(req.user, args.userId, true)
      .findByIdOr404(args.id)
      .then(post => post.update(omit(args, 'id')));
  },
};

export const deletePost = {
  type: GraphQLBoolean,
  args: {
    id: { type: new GraphQLNonNull(GraphQLString) },
  },
  resolve(_, args, req) {
    return Post
      .scopeForUser(req.user, args.userId, true)
      .findByIdOr404(args.id)
      .then(post => post.destroy());
  },
};
