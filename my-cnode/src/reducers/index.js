import { combineReducers } from 'redux'
import topList from './topList'
import user from './user'
import detail from './detail'

const Reducers = combineReducers({
  topList,
  user,
  detail
})
export default Reducers
