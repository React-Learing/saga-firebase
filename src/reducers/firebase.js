import {
  READ_FIREBASE_SUCCES,
  READ_FIREBASE_FAIL,
  READ_FIREBASE_REQUEST,
} from '../actions/firebase';


const initialState = {
  isLoading: false,
  data: '尚未載入資料',
};


export default function readFirebase(state = initialState, action) {
  switch (action.type) {
    case READ_FIREBASE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case READ_FIREBASE_SUCCES: {
      const data = action.payload;
      return {
        ...state,
        isLoading: false,
        data,
      };
    }
    case READ_FIREBASE_FAIL: {
      const data = '讀取失敗';
      return {
        ...state,
        isLoading: false,
        data,
      };
    }
    default:
      return state;
  }
}
