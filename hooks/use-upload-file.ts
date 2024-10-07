import { MutationUploadImageArgs, UploadImageDocument, UploadImageMutation, UploadImageMutationVariables } from '@/graphql/generated';
import { useApolloClient } from '@apollo/client';

const useUploadFile = () => {
  const client = useApolloClient();

  const uploadImage = async (mutationUploadImageArgs: MutationUploadImageArgs) =>
    client.mutate<UploadImageMutation, UploadImageMutationVariables>({
      mutation: UploadImageDocument,
      variables: {
        input: mutationUploadImageArgs.input
      },
    });

  return {
    uploadImage,
  };
};

export default useUploadFile;
