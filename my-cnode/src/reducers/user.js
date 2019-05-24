export default function user(
  state = {
    loading: true,
    data: {
      avatar_url: '',
      create_at: '',
      loginname: '',
      score: 0,
      recent_topics: [],
      recent_replies: []
    }
  },
  action
) {
  switch (action.type) {
    case 'USER_UPDATE':
      return {
        loading: true,
        data: state.data
      }
    case 'USER_SUCC':
      console.log(action)
      return {
        loading: false,

        data: action.data.data.data
      }
    case 'USER_ERROR':
      return {
        loading: false,
        data: {
          avatar_url: '',
          create_at: '',
          loginname: '',
          score: 0,
          recent_topics: [],
          recent_replies: []
        }
      }
    default:
      return state
  }
}
