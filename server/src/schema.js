import { gql } from 'apollo-server';

export const typeDefs = gql`
    type Account {
        id: Int!
        first_name: String
        last_name: String
    }

    type Reservation {
        id: Int!
        customer_name: String
        guest_count: Int
        check_in_date: String
        check_out_date: String
        status_code: String
        platform_code: String
    }

    type TaskItem {
        id: Int!
        item_type: String
        code: String
        amount: String
    }

    type Company {
        id: Int!
        company_name: String
        phone_number: String
        email: String
        cleaning_rules: String
    }

    type File {
        id: Int!
        name: String
        type: String
        size: Int
    }

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
        assignee: Account
        assignees: [Account!]!
        due_date: String
        reservation: Reservation
        task_items: [TaskItem!]!
        company: Company
        notes: String
        files: [File!]!
    }

    input FileInput {
        name: String
        type: String
        size: Int
    }

    input TaskInput {
        id: Int!
        status: String
        priority: String
        due_date: String
        notes: String
        assignee_id: Int
        files: [FileInput!]
    }

    type Query {
        "Get all tasks"
        tasks: [Task!]! 
        "Get a single task by taskId"
        task(id: Int!): Task
        filteredTasks(filter: Int!): [Task!]!
        "Get all accounts"
        accounts: [Account!]!
    }

    type Mutation {
        "Update the task"
        updateTask(input: TaskInput!): Task!
        addFiles(id: Int!, files: [FileInput!]!): [File!]!
        deleteFile(id: Int!): File!
        updateTaskItem(id: Int!, amount: String): TaskItem!
    }
`;