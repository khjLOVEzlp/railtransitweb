import { useAuth } from "context/auth-context";

export const useNoticeModal = () => {
  const { notice, setNotice } = useAuth()

  const open = () => setNotice(true)
  const close = () => setNotice(false)

  return {
    ModalOpen: notice === true,
    open,
    close,
  };
};
