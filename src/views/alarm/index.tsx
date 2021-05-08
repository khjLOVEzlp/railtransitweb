import styled from "@emotion/styled"
import { useState } from "react"
import { useMount } from "../../hook"
import { useHttp } from "../../utils/http"

export const Alarm = () => {
  const [navList, setNavList] = useState([])
  const client = useHttp()
  useMount(() => {
    client(`alarm/statistic/list`, {
      method: "POST", body: JSON.stringify({
        "index": 1,
        "size": 10,
        "type": "string"
      })
    }).then(res => {
      setNavList(res.data)
    })
  })
  return (
    <AlarmStyle>
      <Header>
        <Title>
          告警信息
        </Title>
        <Nav>
          {navList.map((item: any, index) => <li key={index}>{item.title}<span>{item.num}</span></li>)}
        </Nav>
      </Header>
      <Main></Main>
    </AlarmStyle>
  )
}

const AlarmStyle = styled.div`

`

const Header = styled.div`
height: 23rem;
background: #fff;
border-radius: 1rem;
margin-bottom: 1rem;
padding: 0 3rem;
`

const Main = styled.div`
background: #fff;
height: 63rem;
border-radius: 1rem;
padding: 0 3rem;
`

const Title = styled.div`
padding-top: 2rem;
font-size: 2rem;
color: #3A3D44;
margin-bottom: 4rem;
`

const Nav = styled.div`
display: flex;
justify-content: space-between;
font-size: 2rem;
color: #989EAC;
> li {
  > span {
    margin-left: 1rem;
  }
}
`

