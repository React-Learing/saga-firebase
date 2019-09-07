import { READ_SUCCES, READ_REQUEST } from '../actions';


const initialState = {
  isLoading: false,
  data: '尚未載入網頁',
};


export default function readData(state = initialState, action) {
  switch (action.type) {
    case READ_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case READ_SUCCES: {
      const data = action.payload;
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
