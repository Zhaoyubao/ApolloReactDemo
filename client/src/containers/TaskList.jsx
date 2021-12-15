import { Link } from "react-router-dom";

const TaskList = ({filteredTasks, updateTask}) => {
  console.log('TaskList');
  return (
    <>
      {filteredTasks.map(({id, status, assignee, assignees}) => (
        <fieldset key={id}>
          <legend>
            <Link to={`/task/${id}`}>{id}</Link>
          </legend>
          <p>
            <label>Status: </label>
            <select value={status} onChange={updateTask(id, 'status')}>
              <option value="TODO">To do</option>
              <option value="INPROGRESS">In progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </p>
          <p>
            <label>Assignee: </label>
            <select value={assignee.id} onChange={updateTask(id, 'assignee_id')}>
              {assignees.map(({id, first_name, last_name}) => 
                <option key={id} value={id}>{`${first_name} ${last_name}`}</option>
              )}
            </select>
          </p>
        </fieldset>
      ))}
    </>
  );
};

export default TaskList;