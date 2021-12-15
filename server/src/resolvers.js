import {
  TASKS,
  ACCOUNTS,
  RESERVATIONS,
  COMPANYS,
  TASKITEMS,
  FILES,
} from "./repos.js";

export const resolvers = {
  Query: {
    tasks: () => {console.log('[Query tasks]'); return TASKS},
    task: (_, {id}) => {console.log('[Query task]'); return TASKS.find((task) => task.id === id)},
    filteredTasks: (_, {filter}) => {
      console.log('[Query filteredTasks]');
      return TASKS.filter(task => filter === 0 || filter === task.assignee_id);
    },
    accounts: () => ACCOUNTS,
  },
  Mutation: {
    updateTask(_, {input}) {
      const {id, ...others} = input;
      const task = TASKS.find((task) => task.id === id);
      return Object.assign(task, others);
    },
    addFiles(_, {id: task_id, files}) {
      let id = FILES.reduce((maxId, file) => Math.max(maxId, file.id), 0) + 1;
      const newFiles = files.map((file) => ({
        id: id++,
        task_id,
        ...file,
      }));
      FILES.push(...newFiles);
      return newFiles;
    },
    deleteFile(_, {id}) {
      const index = FILES.findIndex(file => file.id === id);
      const [fileToDelete] = FILES.splice(index, 1);
      return fileToDelete;
    },
    updateTaskItem(_, {id, amount}) {
      const taskItem = TASKITEMS.find((item) => item.id === id);
      taskItem.amount = amount;
      return taskItem;
    },
  },
  Task: {
    assignee: (task) => 
      ACCOUNTS.find((assignee) => assignee.id === task.assignee_id),
    assignees: (task) =>
      ACCOUNTS.filter((assignee) => assignee.company_id === task.company_id),
    reservation: (task) =>
      RESERVATIONS.find((reservation) => reservation.id === task.order_id),
    company: (task) =>
      COMPANYS.find((company) => company.id === task.company_id),
    task_items: (task) => TASKITEMS.filter((item) => item.task_id === task.id),
    files: (task) => FILES.filter((file) => file.task_id === task.id),
  },
};
