## 快速開啟：

`git clone`

`yarn`

`yarn start`

將會在[http://localhost:3000](http://localhost:3000) 看到範例

或是也可以看線上[DEMO](https://codesandbox.io/s/github/React-Learing/saga-firebase)

# Redux Saga 讀取Firebase 範例

![](https://i.imgur.com/Ys3kFRk.png)

如果你是一個前端工程師，但是你也希望你的作品可以更完整，也可以有一些簡單的後端功能，但你並不會寫後端的伺服器，也沒時間學的話，那麼firebase會很好的解決你的需求。

如果對firebase怎麼使用不太熟悉的話，可以看一下面的簡易使用方法。

[在react中使用firebase](https://medium.com/tomsnote/使用firebase作為react的資料庫-b61af2333526)

如果對基礎Saga設定不了解的也可以看看下面的詳細範例解說。在這邊因為重複的部分滿多的，就不再詳細解說了。
[Redux Saga 讀取API簡易範例](https://medium.com/tomsnote/redux-saga-讀取api簡易範例-83c0e43c5b1c)

## 設定Firebase

首先先安裝firebase套件來使用firebase。

`yarn add firebase`

**設定檔案**

接著建立一個config資料夾裡面放firebase的設定檔案並引出檔案。

```js
const config = {
  databaseURL: 'https://test.firebaseio.com',
};
export default config;
```

**初始化firebase**

引入firebase套件與剛剛寫好的設定檔案，並使用initializeAPP的方法初始化firebase。

```js
import firebase from 'firebase';
import config from '../config/config';

export default {
  init: () => {
    firebase.initializeApp(config);
  },
};
```

**啟動firebase**

接著我們在react的index.js引入上面的初始化的檔案並啟動他，在index.js裡面加上`FirebaseInit.init()` 即可在專案裡面啟動firebase的功能了。

```js
//...

import FirebaseInit from './firebase/Firebase';

//...

const store = configureStore();
FirebaseInit.init();  //加這一句

ReactDOM.render(
//...
);
```

## 讀取firebase資料庫

接著我們來將firebase各種方法寫在一個檔案裡面方便之後在不同的元件呼叫這個功能可以不用重複再寫，我們建一個FirebaseHelper的文件檔案來放置各種方法。我們這裡先做讀取功能。

引入firebase套件，並使用once來讀取資料，路徑們這邊設定為可帶入的變數，這樣之後才能換位置讀取資料。

```js
import firebase from 'firebase';

export default function read(path) {
  let result = {};
  return firebase.database().ref(`${path}`).once('value', (snapshot) => {
    result = snapshot.val() || {};
  }).then(() => result);
}
```

## Actions

這裡我們需要設定四種action type,

>1. 發起資料讀取---readFirebase
>2. 讀取功能發起---readFirebaseRequest
>3. 讀取成功---readFirebaseSucces
>4. 讀取失敗---readFirebasefail

發起讀取功能，因為是從前端發出的要求，讀取檔案的路徑需要是可以變換的變數，這樣才能達到重複利用程式碼的目的。

讀取成功，必須將讀取成功後的檔案藉由action傳入傳出，所以多設定一個payload來放資料。

```js
export const READ_FIREBASE_SUCCES = 'READ_FIREBASE_SUCCES';
export const READ_FIREBASE_FAIL = 'READ_FIREBASE_FAIL';
export const READ_FIREBASE_REQUEST = 'READ_FIREBASE_REQUEST';
export const READ_FIREBASE = 'READ_FIREBASE';

export function readFirebaseSucces(data) {
  return {
    type: READ_FIREBASE_SUCCES,
    payload: data,
  };
}

export function readFirebaseRequest() {
  return {
    type: READ_FIREBASE_REQUEST,
  };
}

export function readFirebase(path) {
  return {
    type: READ_FIREBASE,
    path,
  };
}

export function readFirebasefail() {
  return {
    type: READ_FIREBASE_FAIL,
  };
```

## Saga

saga這邊就引入actions還有剛剛寫的firebaseHelper的讀取檔案的設定來啟動讀起檔案會發起的動作。

先發出讀取要求，然後讀取資料，接著讀到檔案後將資料放到action裡面並傳回去。

這邊讀取檔案的路徑是actio裡面的path，所以在使用firebaseHelper的read函數的時候需要注意一下。

```js
import { call, put } from 'redux-saga/effects';
import read from '../tools/firebaseHelper';
import { readFirebaseSucces, readFirebaseRequest, readFirebasefail } from '../actions/firebase';

export default function* readFirebase(action) {
  const { path } = action;
  //帶入action的path
  try {
    yield put(readFirebaseRequest());
    const data = yield call(() => read(path));
    yield put(readFirebaseSucces(data));
  } catch (error) {
    yield put(readFirebasefail());
  }
}
```

## Reducer

Reducer根據不同的action狀態去修改要呈現的資料類型並放回去state裡面。

```js
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
```

## Container & Comonents

Container 將 Action , state傳入並綁定連結元件，Comonents製作下面三種功能。

>1. 繪製啟動讀起按鈕
>2. 將data傳到頁面
>3. 根據loading狀態顯示畫面

**container**

```js
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
```

**Components**

```js
...

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
...
export default GetFirebase;

```

## 總結：

照著做就能讀到firebase裡面的資料檔案了，但還是建議自己弄一個firebase專案來玩玩看。

![saga firebase](https://i.imgur.com/cjgpW4a.jpg)