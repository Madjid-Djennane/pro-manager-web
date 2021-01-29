import { User } from '../users/user';
import { Task } from '../_models/task';

export class Project {

    _id: string;
    name: string;
    description: string;
    members: User[];
    tasks: Task[];

    public; constructor(init?: Partial<Project>) {
        Object.assign(this, init);
    }
}
