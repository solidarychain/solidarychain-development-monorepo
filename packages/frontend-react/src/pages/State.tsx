import React from 'react';
import { ActionType, Themes } from '../app/state/reducerStateValue';
import { useStateValue } from '../app/state/useStateValue';
import { InputMouseEvent } from '../types';

type ClickHandlerAction = {
  type: ActionType,
  payload?: any
}

export default () => {
  // get hook
  const [state, dispatch] = useStateValue();

  // handlers
  const onClickChangeThemeHandler = (action: ClickHandlerAction) => (e: InputMouseEvent) => {
    dispatch(action);
  }

  const onClickIncrementHandler = (e: InputMouseEvent) => dispatch({ type: ActionType.INCREMENT });

  // generate buttons
  const buttons = Object.keys(Themes).map(e =>
    <button key={e} onClick={onClickChangeThemeHandler({ type: ActionType.CHANGE_THEME, payload: { newTheme: e } })}>{e}</button>
  );

  // debug helper
  const stateOutput = JSON.stringify(state, undefined, 2);

  return (
    <div>
      <h1>State</h1>
      {buttons}
      <button onClick={onClickIncrementHandler}>Increment</button>
      <pre>state: {stateOutput}</pre>
    </div>
  )
}