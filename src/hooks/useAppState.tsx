import { useContext, useReducer, Reducer } from 'react';
import { AppStateContext } from 'store/Store';

type AsyncReducer = (reducer: Reducer<any, any>, initialState: any) => [any, (action: any) => any];

export const useAsyncReducer: AsyncReducer = (reducer, initialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const asyncDispatch = async (action: any) => typeof action === 'function'
    ? action(asyncDispatch)
    : dispatch(action);

  return [state, asyncDispatch];
};

const useAppState = () => useContext(AppStateContext);

export default useAppState;
