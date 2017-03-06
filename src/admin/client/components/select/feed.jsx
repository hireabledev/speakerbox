import React, { PropTypes } from 'react';
import Select from 'react-select';
import fetch from 'lib/fetch';

async function getOptions(input) {
  const res = await fetch(`/api/feeds?q=${input}`);
  const { data } = res.body;
  return {
    options: data.map(feed => ({
      value: feed.id,
      label: feed.name,
    })),
  };
}

export default function SelectUser(props) {
  return (
    <Select.Async
      cache={false}
      id={props.id}
      name={props.name}
      value={props.value}
      loadOptions={getOptions}
      onChange={props.onChange}
      placeholder="Select Feed"
      {...props}
    />
  );
}

SelectUser.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
  id: PropTypes.string,
};
