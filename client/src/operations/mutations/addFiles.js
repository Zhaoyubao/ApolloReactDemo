import { useMutation, gql } from '@apollo/client';
import { GET_TASK } from '../queries/index';

export const ADD_FILES = gql`
  mutation AddFiles($taskId: Int!, $files: [FileInput!]!) {
    addFiles(id: $taskId, files: $files) {
      id
      name
      type
      size
    }
  }
`;

export function useAddFiles(taskId) {
  const [mutate, {data, error}] = useMutation(
    ADD_FILES, 
    {
      onCompleted: ({addFiles}) => console.log("[Mutation AddFiles] Result:", addFiles),
      update(cache, {data: {addFiles}}) {
        const {task} = cache.readQuery({
          query: GET_TASK,
          variables: {taskId}
        });
        cache.modify({
          id: cache.identify(task),
          fields: {
            files(fileRefs=[], {toReference}) {
              // const newFileFragment = gql`
              //   fragment NewFile on File {
              //     id
              //     name
              //     type
              //     size
              //   }
              // `;
              const newFileRefs = addFiles.map((file) => {
                return toReference(file);
                // return cache.writeFragment({
                //   data: file,
                //   fragment: newFileFragment,
                // });
              });
              return [...fileRefs, ...newFileRefs];
            },
          },
        });
      },
    }
  );
  const addFiles = (e) => {
    const files = [...e.target.files].map(({name, type, size}) => ({name, type, size}));
    const options = {
      variables: {
        taskId,
        files
      }
    };
    mutate(options);
  };

  return {addFiles, data, error};
}
