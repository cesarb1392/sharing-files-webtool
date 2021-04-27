import { createContext, useContext } from 'react';

export type State = {
  test: string;
};
export const StateContext = createContext<State>({
  test: 'Hello World',
});
export const useState = () => useContext(StateContext);
