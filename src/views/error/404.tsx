import { Button } from "antd"
import { useNavigate } from "react-router"

export const Not = () => {
  const navigate = useNavigate()
  return (
    <div style={{ width: '200px', height: "200px", position: "absolute", margin: "auto", left: 0, top: 0, bottom: 0, right: 0, textAlign: "center" }}>
      <h4>对不起，您访问的页面不存在</h4>
      <Button onClick={() => navigate("/home")}>回到首页</Button>
    </div>
  )
}
