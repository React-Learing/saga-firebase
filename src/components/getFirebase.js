import React from 'react';
import PropTypes from 'prop-types';

class GetFirebase extends React.Component {
  render() {
    const { readFirebase, firebase } = this.props;

    const { data, isLoading } = firebase;

    const path = '/data';
    return (
      <div>
        <h2>Firebase</h2>
        <div>
          <button type="button" onClick={() => readFirebase(path)}>
            Get data
          </button>
          {' '}
          <div>
            {' '}
            { isLoading ? 'Loading...' : JSON.stringify(data)}
          </div>
        </div>
      </div>
    );
  }
}

GetFirebase.propTypes = {
  readFirebase: PropTypes.func.isRequired,
  firebase: PropTypes.shape([]).isRequired,
};

export default GetFirebase;
