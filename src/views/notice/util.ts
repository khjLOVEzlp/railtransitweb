import {useSetUrlSearchParam, useUrlQueryParam} from "hook/useUrlQueryParam";

export const useNoticeModal = () => {
  const setUrlParams = useSetUrlSearchParam();

  const [{Notice}, setNotice] = useUrlQueryParam([
    "Notice"
  ])

  const open = () => setNotice({Notice: true})
  const close = () => setUrlParams({Notice: ""});

  return {
    ModalOpen: Notice === "true",
    open,
    close,
  };
};
