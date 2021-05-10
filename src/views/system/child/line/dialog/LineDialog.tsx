import { MyModal } from "../../../../../components/MyModal"
interface Props {
  formData: object,
  formType: string,
  setIsShow: (isShow: boolean) => void
}

export const LineDialog = ({ setIsShow, formData, formType }: Props) => {
  const submit = () => {

  }
  return (
    <MyModal title={formType} isVisible={true} setIsShow={setIsShow} isWidth="100rem" submit={submit}>
      <div></div>
    </MyModal>
  )
}