import { gql } from 'apollo-server';

export const typeDefs = gql`
    "A task that the manager assign to a member"
    type Task {
        "The task's id"
        id: Int!
        "The task's status"
        status: String
        "The task's type"
        type: String
        "The task's priority"
        priority: String
        "The task's assignee"
        assignee: Assignee,
        assignees: [Assignee!]!
    }

    type Assignee {
        id: Int!
        first_name: String
        last_name: String
    } 

    input TaskInput {
        status: String
        type: String
        priority: String
        assigneeId: Int
    }

    type Query {
        "Get all tasks"
        tasks: [Task!]! 
        "Get a single task by taskId"
        task(id: Int!): Task
        assignees: [Assignee!]!
    }

    type Mutation {
        "Update the task"
        updateTask(id: Int!, input: TaskInput!): Task!
    }
`;