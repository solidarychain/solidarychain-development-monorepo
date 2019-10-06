import React, { Fragment } from 'react';
import { ActionType, Themes } from '../app/state/reducerStateValue';
import { useStateValue } from '../app/state/useStateValue';
import { InputMouseEvent } from '../types/InputEvent';

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
    <Fragment>
      <h1>Theme: {state.theme.primary} : {state.counter}</h1>
      {buttons}
      <button onClick={onClickIncrementHandler}>Increment</button>
      <pre>state: {stateOutput}</pre>
    </Fragment>
  )
}