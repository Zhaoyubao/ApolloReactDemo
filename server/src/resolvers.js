import { TASKS, ASSIGNEES } from './mocks.js';

export const resolvers = {
    Query: {
        tasks: () => TASKS,
        task: (_, args) => TASKS.find(task => task.id === args.id),
        assignees: () => ASSIGNEES
    },
    Mutation: {
        updateTask(_, args) {
            const task = TASKS.find(task => task.id === args.id);
            return Object.assign(task, args.input);
        }
    },
    Task: {
        assignee: (task) => ASSIGNEES.find(assignee => assignee.id === task.assigneeId),
        assignees: (task) => ASSIGNEES.filter(assignee => assignee.companyId === task.companyId)
    }
};