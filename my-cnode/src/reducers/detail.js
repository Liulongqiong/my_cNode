export default function detail(
  state = {
    loading: true,
    data: {
      data: {
        id: '',
        title: '',
        create_at: '',
        author: {
          loginname: ''
        },
        content: '',
        replies: [],
        tab: ''
      }
    }
  },
  action
) {
  switch (action.type) {
    case 'DETAIL_UPDATE':
      return {
        loading: true,
        data: state.data
      }
    case 'DETAIL_SUCC':
      return {
        loading: false,
        data: action.data.data
      }
    case 'DETAIL_ERROR':
      return {
        loading: true,
        data: {
          data: {
            id: '',
            title: '',
            create_at: '',
            author: {
              loginname: ''
            },
            content: '',
            replies: [],
            tab: ''
          }
        }
      }
    default:
      return state
  }
}
