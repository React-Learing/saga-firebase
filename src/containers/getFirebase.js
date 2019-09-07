import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Getfirebase from '../components/getFirebase';
import { readFirebase } from '../actions/firebase';


const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    readFirebase,
  },
  dispatch,
);

export default connect(
  (state) => ({ firebase: state.firebase }),
  mapDispatchToProps
)(Getfirebase);
