import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ImagePicker } from 'lib/client/components/form/img-picker';
import { updateScheduledPost } from '../../actions/posts';

export function PostImg({ disabled, post, onChange }) {
  return (
    <ImagePicker
      input={{
        value: post.imgUrl,
        onChange: value => onChange(post.id, value),
      }}
      disabled={disabled}
    />
  );
}

PostImg.propTypes = {
  disabled: PropTypes.bool,
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapDispatchToPros = dispatch => ({
  onChange: (id, imgUrl) => dispatch(updateScheduledPost(id, { imgUrl })),
});

export default connect(null, mapDispatchToPros)(PostImg);
