import { ApolloClient, InMemoryCache, HttpLink, from, gql } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

const httpLink = new HttpLink({
    uri: "http://localhost:4000/"
});
  
const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach(({ message, locations, path }) =>
        console.error(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ));
    }
    if (networkError) console.error(`[Network error]: ${networkError}`);
});

export const client = new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache()
});

export const GET_TASKS = gql`
    query GetTasks {
        tasks {
            id
            status
            assignee {
                id
                first_name
                last_name
            }
        }
    } 
`;
export const GET_TASK_DETAILS = gql`
    query TaskDetails($taskId: Int!) {
        task(id: $taskId) {
            id
            status
            type
            priority
            assignee {
                ...accountFields
            }
            assignees {
                ...accountFields
            }
        }
    }

    fragment accountFields on Account {
        id
        first_name
        last_name
    }
`;
export const UPDATE_TASK = gql`
    mutation UpdateTask($taskId: Int!, $taskInput: TaskInput!) {
        updateTask(id: $taskId, input: $taskInput) {
            id
            status
            priority
            assignee {
                id
            }
        }
    }
`;