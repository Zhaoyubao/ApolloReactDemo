import { useMutation, gql } from "@apollo/client";

export const UPDATE_TASKITEM = gql`
  mutation UpdateTaskItem($id: Int!, $amount: String) {
    updateTaskItem(id: $id, amount: $amount) {
      id
      amount
    }
  }
`;

export function useUpdateTaskItem() {
  const [mutate, {data, error}] = useMutation(UPDATE_TASKITEM, {
    onCompleted: ({ updateTaskItem }) => console.log("[Mutation UpdateTaskItem] Result:", updateTaskItem),
  });

  const updateTaskItem = (id) =>
    ({target: {value: amount}}) => {
      const options = {
        variables: {
          id,
          amount
        },
      };
      mutate(options);
    };

  return {updateTaskItem, data, error};
}
