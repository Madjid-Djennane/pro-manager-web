import { createAction, props } from '@ngrx/store';
import { User } from './user';

export const loadUser = createAction(
    '[User] Load_User'
);

export const editUserInfos = createAction(
    '[User] Edit_User_Infos',
    props<{ infos: User; }>()
);
