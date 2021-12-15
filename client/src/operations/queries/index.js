import {gql} from "@apollo/client";

const AccountFragment = gql`
  fragment accountFields on Account {
    id
    first_name
    last_name
  }
`;
const TaskItemFragment = gql`
  fragment taskItemFields on TaskItem {
    id
    item_type
    code
    amount
  }
`;
const FileFragment = gql`
  fragment fileFields on File {
    id
    name
    type
    size
  }
`;

export const GET_TASKS = gql`
  query GetTasks {
    tasks {
      id
      status
      assignee {
        ...accountFields
      }
      assignees {
        ...accountFields
      }
    }
  }
  ${AccountFragment}
`;
export const GET_TASK = gql`
  query GetTask($taskId: Int!) {
    task(id: $taskId) {
      id
      status
      type
      priority
      due_date
      notes
      assignee {
        ...accountFields
      }
      assignees {
        ...accountFields
      }
      company {
        cleaning_rules
      }
      task_items {
        ...taskItemFields
      }
      files {
        ...fileFields
      }
    }
  }
  ${AccountFragment}
  ${TaskItemFragment}
  ${FileFragment}
`;

export const FILTER_TASKS = gql`
  query FilterTasks($filter: Int!) {
    filteredTasks(filter: $filter) {
      id
      status
      assignee {
        ...accountFields
      }
      assignees {
        ...accountFields
      }
    }
  }
  ${AccountFragment}
`;

export const GET_ACCOUNTS = gql`
  query GetAccounts {
    accounts {
      ...accountFields
    }
  }
  ${AccountFragment}
`;