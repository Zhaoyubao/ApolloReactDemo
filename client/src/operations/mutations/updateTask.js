import { useMutation, useReactiveVar, gql } from "@apollo/client";
// import { FILTER_TASKS } from '../queries/index';
import { filterVar } from '../../client';

export const UPDATE_TASK = gql`
  mutation UpdateTask($taskInput: TaskInput!) {
    updateTask(input: $taskInput) {
      id
      status
      priority
      due_date
      notes
      assignee {
        id
      }
      files {
        id
      }
    }
  }
`;

export function useUpdateTask() {
  const prevFilter = useReactiveVar(filterVar);
  const [mutate, {data, error}] = useMutation(UPDATE_TASK, {
    onCompleted: ({updateTask}) => console.log("Mutation Result:", updateTask),
    update(cache, result, options) {
      const nextFilter = options.variables.taskInput?.assignee_id;
      if (nextFilter) {
        [prevFilter, nextFilter].forEach(filter => {
          cache.evict({
            fieldName: 'filteredTasks',
            args: {filter}
          });
        });
      }
    },
    // refetchQueries({data: {updateTask}}) {
    //   return [
    //     {query: FILTER_TASKS, variables: {filter: prevFilter}},
    //     {query: FILTER_TASKS, variables: {filter: updateTask.assignee_id}},
    //   ];
    // }
  });

  const updateTask = (id, field) =>
    ({target: {value}}) => {
      const options = {
        variables: {
          taskInput: {
            id,
            [field]: field === "assignee_id" ? +value : value,
          },
        },
      };
      // if (field === "assignee_id") {
      //   options.update = (cache) => {
      //     const nextFilter = +value;
      //     [prevFilter, nextFilter].forEach(filter => {
      //       cache.evict({
      //         fieldName: 'filteredTasks',
      //         args: {filter}
      //       });
      //     });
      //   };
      // }
      mutate(options);
    };

  return {updateTask, data, error};
}
