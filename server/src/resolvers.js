import { TASKS, ACCOUNTS } from './mocks.js';

export const resolvers = {
    Query: {
        tasks: () => TASKS,
        task: (_, args) => TASKS.find(task => task.id === args.id),
        accounts: () => ACCOUNTS
    },
    Mutation: {
        updateTask(_, args) {
            const task = TASKS.find(task => task.id === args.id);
            return Object.assign(task, args.input);
        }
    },
    Task: {
        assignee: (task) => ACCOUNTS.find(assignee => assignee.id === task.accountId),
        assignees: (task) => ACCOUNTS.filter(assignee => assignee.companyId === task.companyId)
    }
};