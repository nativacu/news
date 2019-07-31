export class User {
    uid: string;
    email: string;
    displayName: string;
    fName?: string;
    lName?: string;
    subscriptions?: string[];

    constructor(uid: string, email: string, name: string, lname: string) {
        this.uid = uid;
        this.fName = name;
        this.lName = lname;
        this.email = email;
        this.subscriptions = [];
    }
}
