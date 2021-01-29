import { Project } from '../projects/project';
export class User {

    _id: string;
    name: string;
    lastname: string;
    role: string;
    email: string;
    projects: Project[];
    createdAt: Date;
    updatedAt: Date;

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}
