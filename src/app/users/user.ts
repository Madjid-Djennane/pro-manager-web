export class User {

    _id: string;
    name: string;
    lastname: string;
    role: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;

    public constructor(init?: Partial<User>) {
        Object.assign(this, init);
    }
}
