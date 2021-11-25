import React, { Context, Dispatch, PropsWithChildren, Reducer, useEffect, useReducer, useState } from "react";
import LoadingSplash from "./LoadingSplash";

export type ContextWithReducer<S, A> = Context<{ state: S, dispatch: Dispatch<A> }>

interface IContextWrapperProps<S, A> {
  context: ContextWithReducer<S, A>;
  reducer: Reducer<S, A>;
  loadingBuilder: () => JSX.Element;
  childrenBuilder: () => JSX.Element;
  initialStateBuilder: () => Promise<S>;
}
const ContextWrapper = <S, A>({ context, reducer, loadingBuilder, childrenBuilder, initialStateBuilder }: PropsWithChildren<IContextWrapperProps<S, A>>) => {
  const [initialState, setInitialState] = useState<S | undefined>(undefined);
  // Use `as any` to pretend that we aren't giving an empty state to the reducer.
  // Rely on the logic below to not return a provider with the invalid state.
  useEffect(() => {
    const buildInitialState = async () => {
      setInitialState(await initialStateBuilder());
    }

    buildInitialState();
  }, [initialStateBuilder]);

  if (initialState === undefined) {
    return <LoadingSplash />
  } else {
    return <ContextProvider
      context={context}
      reducer={reducer}
      initialState={initialState}
    >
      {childrenBuilder()}
    </ContextProvider>
  }
};

interface IContextProviderProps<S, A> {
  context: ContextWithReducer<S, A>;
  reducer: Reducer<S, A>;
  initialState: S;
}
const ContextProvider =
  <S, A>({ context, reducer, initialState, children }: PropsWithChildren<IContextProviderProps<S, A>>) => {
    const [state, dispatch] = useReducer(reducer, initialState as any)
    return <context.Provider value={{ state, dispatch }}>
      {children}
    </context.Provider>
  }

export default ContextWrapper
