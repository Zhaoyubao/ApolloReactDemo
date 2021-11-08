import { Link, useParams } from "react-router-dom";
import { useQuery, useMutation } from '@apollo/client';
import { GET_TASK_DETAILS, UPDATE_TASK } from './client';

const TaskDetails = () => {
  const { taskId } = useParams();
  const { loading, error, data } = useQuery(GET_TASK_DETAILS, {
    variables: {taskId: +taskId},
    onCompleted: ({task}) => console.log('Query Result:', task)
  });
  const [mutate] = useMutation(UPDATE_TASK, {
    onCompleted: ({updateTask}) => console.log('Mutation Result:', updateTask)
  });
  console.log('TaskDetail Component');
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`; 

  const {status, type, priority, assignee, assignees} = data.task;
  const handleChange = 
    (field) => 
      (e) => {
        const value = e.target.value;
        const options = {
          variables: {
            taskId: +taskId,
            taskInput: {
              [field]: field === 'assigneeId' ? +value : value
            }
          }
        };
        mutate(options);
      }; 


  return (
    <>
      <p><Link to={'/'}>Back</Link></p>
      <fieldset>
          <legend>{taskId}</legend>
          <p>
            <label>Status: </label>
            <select value={status} onChange={handleChange('status')}>
              <option value="TODO">To do</option>
              <option value="INPROGRESS">In progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </p>
          <p>
            <label>Assignee: </label>
            <select value={assignee.id} onChange={handleChange('assigneeId')}>
              {assignees.map( ({id, first_name, last_name}) => 
                <option key={id} value={id}>{`${first_name} ${last_name}`}</option>
              )}
            </select>
          </p>
          <p>Type: {type}</p>
          <p>Priority: {priority}</p>
      </fieldset>
    </>
  );

};

export default TaskDetails;