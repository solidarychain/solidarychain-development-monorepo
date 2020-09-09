// StateProvider
export const initialState = {
  theme: { primary: 'GREEN' },
  counter: 0,
  searchUsersQuery: '',
  user: {
    logged: false,
    profile: {},
  }
};

// this infers State type from initialState object???
export type State = typeof initialState;

// reducer actions
export enum ActionType {
  CHANGE_THEME = 'CHANGE_THEME',
  INCREMENT = 'INCREMENT',
  CHANGE_SEARCH_USERS_QUERY = 'CHANGE_SEARCH_USERS_QUERY',
  LOGGED_USER = 'LOGGED_USER',
  LOGOUT_USER = 'LOGOUT_USER',
  // material
  SET_SHELL_WIDTH = 'SET_SHELL_WIDTH',
}

export type Action =
  | { type: ActionType.CHANGE_THEME, payload: { newTheme: string } }
  | { type: ActionType.INCREMENT, payload: any }
  | { type: ActionType.CHANGE_SEARCH_USERS_QUERY, payload: { query: string } }
  | { type: ActionType.LOGGED_USER, payload: { profile: any } }
  | { type: ActionType.LOGOUT_USER, payload: any }
  | { type: ActionType.SET_SHELL_WIDTH, payload: { width: number } }
  ;

// reducer types
export enum Themes {
  GREEN = 'Green',
  BLUE = 'Blue',
  RED = 'Red',
  BLACK = 'Black',
  WHITE = 'White',
  PINK = 'Pink',
}

export default (state: State, action: Action) => {
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
    case ActionType.LOGGED_USER:
      return {
        ...state,
        user: {
          logged: true,
          profile: action.payload.profile
        }
      }
    case ActionType.LOGOUT_USER:
      return {
        ...state,
        user: {
          logged: false,
          profile: {}
        }
      }
    case ActionType.SET_SHELL_WIDTH: return {
      ...state,
      shellWidth: action.payload.width,
    };

    default:
      throw new Error('Unknown Action type!');
  }
}
