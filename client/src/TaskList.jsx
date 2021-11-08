import { Link } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_TASKS } from './client';

const TaskList = () => {
  const { loading, error, data } = useQuery(GET_TASKS, {
    onCompleted: ({tasks}) => console.log('Query Result:', tasks)
  });
  console.log('TaskList Component');
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`; 

  return (
    <>
      {data.tasks.map(({id, status, assignee: {first_name, last_name}}) => (
        <fieldset key={id}>
          <legend>
            <Link to={`/task/${id}`}>{id}</Link>
          </legend>
          <p>Status: {status}</p>
          <p>Assignee: {`${first_name} ${last_name}`}</p>
        </fieldset>
      ))}
    </>
  );
};

export default TaskList;