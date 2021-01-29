export class Task {

    _id: string;
    title: string;
    description: string;
    assignedTo: string;
    priority: string;
    category: string;
    status: string;
    project: string;

    public; constructor(init?: Partial<Task>) {
        Object.assign(this, init);
    }
}
