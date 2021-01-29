import { Action, createReducer, on } from '@ngrx/store';
import * as UserActions from './user.action';
import { User } from './user';

export interface State {
    data: User;
}

export const initialState: State = {
    data: null
};

const _userReducer = createReducer(
    initialState,
    on(UserActions.editUserdata, (state, { data }) => (
        {
            ...state,
            data
        }
    ))
);

export function reducer(state: State, action: Action) {
    return _userReducer(state, action);
}
