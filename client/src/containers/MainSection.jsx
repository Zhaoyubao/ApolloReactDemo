import { useQuery, useReactiveVar } from '@apollo/client';
import { FILTER_TASKS } from '../operations/queries/index';
import { filterVar } from '../client';
import { useUpdateTask } from '../operations/mutations/updateTask';
import TaskList from "./TaskList";
import TaskFilter from "./TaskFilter";

const MainSection = () => {
  const filter = useReactiveVar(filterVar);
  const {loading, error, data} = useQuery(FILTER_TASKS, {
    onCompleted: ({filteredTasks}) => console.log("[Query FilterTasks]:", filteredTasks),
    variables: {filter},
  });
  const {updateTask} = useUpdateTask();

  console.log('MainSection');
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <>
      <h2>Task Board</h2>
      <TaskFilter 
        activeFilter={filter}
        setFilter={filterVar}
      />
      <TaskList 
        filteredTasks={data.filteredTasks}
        updateTask={updateTask}
      />
    </>
  );
};

export default MainSection;