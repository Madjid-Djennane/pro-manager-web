import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.action';
import { User } from './user';

export interface State {
    infos: User;
}

export const initialState: State = {
    infos: null,
};

const _userReducer = createReducer(
    initialState,
    on(UserActions.editUserInfos, (state, { infos }) => (
        {
            ...state,
            infos
        }
    ))
);

export function reducer(state: State, action: Action) {
    return _userReducer(state, action);
}
