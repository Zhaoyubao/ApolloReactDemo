import { useMutation, gql } from "@apollo/client";
import { GET_TASK } from "../queries/index";

export const DELETE_FILE = gql`
  mutation DeleteFile($id: Int!) {
    deleteFile(id: $id) {
      id
    }
  }
`;

export function useDeleteFile(taskId) {
  const [mutate, {data, error}] = useMutation(DELETE_FILE, {
    update(cache, {data: {deleteFile} }) {
      const {task} = cache.readQuery({
        query: GET_TASK,
        variables: {taskId},
      });
      cache.modify({
        id: cache.identify(task),
        fields: {
          files(fileRefs, {readField}) {
            return fileRefs.filter((fileRef) => {
              const shouldDelete = deleteFile.id === readField('id', fileRef);
              if (shouldDelete) {
                // cache.evict({id: cache.identify(fileRef)});
                cache.evict({id: `File:${deleteFile.id}`});
              }
              return !shouldDelete;
            });
          },
        },
      });
    },
  });
  return {mutate, data, error};
}
