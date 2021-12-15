import { Link, useParams } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_TASK } from '../operations/queries/index';
import { useUpdateTask } from '../operations/mutations/updateTask';
import { useUpdateTaskItem } from '../operations/mutations/updateTaskItem';
import { useAddFiles } from '../operations/mutations/addFiles';
import { useDeleteFile } from '../operations/mutations/deleteFile';

const TaskDetails = () => {
  const {taskId} = useParams();
  const {loading, error, data} = useQuery(GET_TASK, {
    variables: {taskId: +taskId},
    onCompleted: ({task}) => console.log('Query Result:', task),
  });
  const {updateTask} = useUpdateTask();
  const {updateTaskItem} = useUpdateTaskItem();
  const {addFiles} = useAddFiles(+taskId);
  const {mutate: deleteFile} = useDeleteFile(+taskId);
  
  console.log('TaskDetails');
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`; 

  const {status, type, priority, due_date, assignee, assignees, company: {cleaning_rules}, task_items, files} = data.task;

  return (
    <>
      <h2>Task Detail</h2>
      <p><Link to={'/'}>Back</Link></p>
      <fieldset>
          <legend>{taskId}</legend>
          <p>
            <label>Status: </label>
            <select value={status} onChange={updateTask(+taskId, 'status')}>
              <option value="TODO">To do</option>
              <option value="INPROGRESS">In progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </p>
          <p>
            <label>Assignee: </label>
            <select value={assignee.id} onChange={updateTask(+taskId, 'assignee_id')}>
              {assignees.map(({id, first_name, last_name}) => 
                <option key={id} value={id}>{`${first_name} ${last_name}`}</option>
              )}
            </select>
          </p>
          <p>Type: {type}</p>
          <p>Priority: {priority}</p>
          <p>Due date: {due_date}</p>
          <hr />
          <p><strong>Clean the room:</strong> {cleaning_rules}</p>
          <strong>Supply for the inventory and record:</strong>
          {task_items.map(({id, code, amount}) => (
            <p key={id}>
              {code}: &nbsp;{amount}&nbsp;&nbsp;&nbsp;
              <input type="number" 
                style={{width: '50px'}} 
                min={0} 
                defaultValue={+amount} 
                onBlur={updateTaskItem(id)} />
            </p>
          ))}
          <hr />
          <p>
            <input type="file" multiple onChange={addFiles} />
          </p>
          <ul>
            {files.map(({id, name, size}) => (
              <li key={id}>
                {name} {size} &nbsp;&nbsp;&nbsp;
                <button onClick={() => deleteFile({variables: {id}})} style={{color: 'red'}}>X</button>
              </li>
            ))}
          </ul>
      </fieldset>
    </>
  );
};

export default TaskDetails;