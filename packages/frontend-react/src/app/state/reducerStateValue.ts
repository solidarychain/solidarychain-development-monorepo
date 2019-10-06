// StateProvider
export const initialState = {
  theme: { primary: 'GREEN' },
  counter: 0,
  searchUsersQuery: ''
};

// reducer actions
export enum ActionType {
  CHANGE_THEME = 'CHANGE_THEME',
  INCREMENT = 'INCREMENT',
  CHANGE_SEARCH_USERS_QUERY = 'CHANGE_SEARCH_USERS_QUERY'
}

// reducer types
export enum Themes {
  GREEN = 'GREEN',
  BLUE = 'BLUE',
  RED = 'RED',
  BLACK = 'BLACK',
  WHITE = 'WHITE',
}

export default (state: any, action: any) => {
  switch (action.type) {
    case ActionType.CHANGE_THEME:
      return {
        ...state,
        theme: {
          primary: action.payload.newTheme
        }
      };
    case ActionType.INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      }
    case ActionType.CHANGE_SEARCH_USERS_QUERY:
      return {
        ...state,
        searchUsersQuery: action.payload.query
      }
    default:
      throw new Error('Unknown Action type!');
  }
}
