import React, { PropTypes } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import startCase from 'lodash/startCase';
import { getModel } from '../../models';
import DisplayValue from '../display-value';

export default function AdminTable({ loadMore, hasMore, items, modelName }) {
  const model = getModel(modelName);
  const fields = Object.keys(model.fields);
  return (
    <div className="table-responsive">
      <table className="table admin-table">
        <thead>
          <tr>
            {fields.map(field => (
              <th key={field}>{startCase(field)}</th>
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
                <td key={field}>
                  <DisplayValue
                    fieldName={field}
                    fieldModel={model.fields[field]}
                    value={item[field]}
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
  modelName: PropTypes.string.isRequired,
};
