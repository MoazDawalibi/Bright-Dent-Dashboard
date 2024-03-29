import { useMutation, useQueryClient, UseMutationResult } from 'react-query';
import { toast } from 'react-toastify';
import useAxios from './useAxios';
import { useTranslation } from 'react-i18next';

type AxiosResponse = {
  message: string;
  data:any ,
  success:true 
};

function useAddMutation(key: string, url: string): any {
  const axios = useAxios();
  const [t] = useTranslation();
  const queryClient = useQueryClient();

  return useMutation<any>(
    async (dataToSend) => {
      console.log("ibrahim",dataToSend);
      
      const { data } = await axios.post(url, dataToSend);
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([key]);
        toast.success(data.message || t("Add Successful"));
      },
      onError: (error:any) => {
        const message = error?.response?.data?.message || t("failed_to_add_data");
        toast.error(message);
      }
    }
  );
}

export default useAddMutation;
