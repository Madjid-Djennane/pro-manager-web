import { createAction, props } from '@ngrx/store';
import { User } from './user';

export const loadUser = createAction(
    '[User] Load_User'
);

export const editUserdata = createAction(
    '[User] Edit_User_data',
    props<{ data: User; }>()
);
