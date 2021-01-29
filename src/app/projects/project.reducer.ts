import { Action, createReducer, on } from '@ngrx/store';
import * as ProjectActions from './project.actions';
import { Project } from './project';

export interface State {
    data: Project[];
}

export const initialState: State = {
    data: null,
};

const _projectReducer = createReducer(
    initialState,
    on(ProjectActions.editProjectsData, (state, { data }) => (
        {
            ...state,
            data
        }
    ))
);

export function reducer(state: State, action: Action) {
    return _projectReducer(state, action);
}
