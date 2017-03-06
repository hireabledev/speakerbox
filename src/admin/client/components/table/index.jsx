import React, { PropTypes } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import startCase from 'lodash/startCase';
import DisplayValue from '../display-value';

export default function AdminTable({ loadMore, hasMore, items, model }) {
  const { fields } = model;
  return (
    <div className="table-responsive">
      <table className="table admin-table">
        <thead>
          <tr>
            {fields.map(field => (
              <th key={field.key}>{startCase(field.key)}</th>
            ))}
          </tr>
        </thead>
        <InfiniteScroll
          element="tbody"
          pageStart={0}
          loadMore={loadMore}
          hasMore={hasMore}
        >
          {items.map((item, index) => (
            <tr key={item.id || index}>
              {fields.map(field => (
                <td key={field.key}>
                  <DisplayValue
                    schema={field}
                    value={item[field.key]}
                    shortenValues
                  />
                </td>
              ))}
            </tr>
          ))}
        </InfiniteScroll>
      </table>
    </div>
  );
}

AdminTable.propTypes = {
  loadMore: PropTypes.func.isRequired,
  hasMore: PropTypes.bool.isRequired,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  model: PropTypes.shape({
    fields: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};
