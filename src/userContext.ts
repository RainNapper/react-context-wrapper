import { produce } from 'immer';
import { createContext, Reducer } from "react";
import { ContextWithReducer } from './ContextWrapper';

export interface IBaseAction {
  type: string;
}

export type IUserAction = ISomeAction;

export interface ISomeAction extends IBaseAction {
  type: "SOME_ACTION";
}

export interface IUserSettings {
  setting1: boolean;
  setting2: string;
}

export interface IUserState {
  user: string;
  settings: IUserSettings;
}

export const userReducer: Reducer<IUserState, IUserAction> =
  (state: IUserState, action: IUserAction) =>
    produce(state, draft => {
      switch (action.type) {
        default:
          return;
      }
    });

export const userContext: ContextWithReducer<IUserState, IUserAction> =
  createContext(undefined as any);
