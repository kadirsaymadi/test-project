// tüm reducer'ları export edebilmek için redux altındaki combineReducers ı sayfaya dahil et
import { combineReducers } from 'redux';

// person Reducer ı sayfaya dahil et
import productReducer from './product';

// combineReducers ile tüm reducerları export et
export default combineReducers({
    productReducer,
});