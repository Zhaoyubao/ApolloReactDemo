import { ApolloClient, InMemoryCache, HttpLink, from, gql } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/'
});
  
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
            console.error(
                `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
            )
        );
    }
    if (networkError) console.error(`[Network error]: ${networkError}`);
});

export const client = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache()
});

const accountFragment = gql`
    fragment accountFields on Account {
        id
        first_name
        last_name
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
        }
    }
    ${accountFragment}
`;
export const GET_TASK = gql`
    query GetTask($taskId: Int!) {
        task(id: $taskId) {
            id
            status
            type
            priority
            todo_date
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
        }
    }
    ${accountFragment}
`;
export const UPDATE_TASK = gql`
    mutation UpdateTask($taskInput: TaskInput!) {
        update_task(input: $taskInput) {
            id
            status
            priority
            todo_date
            notes
            assignee {
                id
            }
        }
    }
`;