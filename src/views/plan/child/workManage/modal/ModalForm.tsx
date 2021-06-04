import {Drawer} from "antd";
import {useHttp} from "../../../../../utils/http";
import {useCallback, useEffect, useState} from "react";

interface Props {
  visible: boolean
  onCancel: (visible: boolean) => void
  formData: any
}

export const ModalForm = ({visible, onCancel, formData}: Props) => {
  const client = useHttp()
  const [share, setShare] = useState()
  console.log(share)
  const getShare = useCallback(() => {
    client(`plan/getShare/${formData.planId}`).then(res => {
      setShare(res.data)
    })
  }, [client, formData.planId])

  useEffect(() => {
    getShare()
  }, [getShare])

  const onClose = () => {
    onCancel(false);
  };
  return (
    <Drawer
      title="详情"
      placement="right"
      width={"100%"}
      onClose={onClose}
      visible={visible}
    >

    </Drawer>
  )
}