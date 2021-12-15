import { useQuery } from '@apollo/client';
import { GET_ACCOUNTS } from '../operations/queries/index';

const TaskFilter = ({activeFilter, setFilter}) => {
  const {loading, error, data} = useQuery(GET_ACCOUNTS, {
    onCompleted: ({accounts}) => console.log('[Query GetAccounts] Result:', accounts)
  }); 

  console.log('TaskFilter');
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    <div>
      <label>Filter by assignee: </label>
      <select value={activeFilter} onChange={(e) => {setFilter(+e.target.value)}}>
        <option key={0} value="0">All</option>
        {data.accounts.map(({id, first_name, last_name}) => 
          <option key={id} value={id}>{`${first_name} ${last_name}`}</option>
        )}
      </select>
    </div>
  );
}

export default TaskFilter;