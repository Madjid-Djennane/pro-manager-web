import { createAction, props } from '@ngrx/store';
import { Project } from './project';

export const loadProjects = createAction(
    '[Project] Load_Projects'
);

export const editProjectsData = createAction(
    '[Project] Edit_Projects_Data',
    props<{ data: Project[]; }>()
);
