import { TASKS, ACCOUNTS, RESERVATIONS, TASKITEMS } from './mocks.js';

export const resolvers = {
    Query: {
        tasks: () => TASKS,
        task: (_, args) => TASKS.find(task => task.id === args.id),
        accounts: () => ACCOUNTS,
    },
    Mutation: {
        updateTask(_, args) {
            const {id, ...input} = args.input;
            const task = TASKS.find(task => task.id === id);
            return Object.assign(task, input);
        },
    },
    Task: {
        assignee: (task) => ACCOUNTS.find(assignee => assignee.id === task.assignee_id),
        assignees: (task) => ACCOUNTS.filter(assignee => assignee.company_id === task.company_id),
        reservation: (task) => RESERVATIONS.find(reservation => reservation.id === task.order_id),
        task_items: (task) => TASKITEMS.filter(item => item.task_id === task.id),
    }
};