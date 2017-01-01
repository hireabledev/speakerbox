import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ImagePicker } from 'lib/components/form/img-picker';
import * as postActions from '../../actions/posts';

export function PostImg({ post, onChange }) {
  return (
    <ImagePicker
      input={{
        value: post.imgUrl,
        onChange: value => onChange(post.id, post.type, value),
      }}
    />
  );
}

PostImg.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapDispatchToPros = dispatch => ({
  onChange: (id, type, imgUrl) => dispatch(postActions[type].updateScheduledPost(id, { imgUrl })),
});

export default connect(null, mapDispatchToPros)(PostImg);
