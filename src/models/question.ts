/**
 * @file Defining user model
 * @author Yurrian Pierre-Boyer
 */

export interface Question {
    id: number;
    acceptedId: number;
    title: string;
    content: string;
    creationDate: Date;
    status: boolean;
    userID: number;
    //revature: boolean;
}
