import styled from "@emotion/styled"

export const layout = { height: '100%', borderRadius: "14px" }
export const sider = { height: "100%", borderRadius: "14px", paddingTop: "5rem" }
export const menuStyle = { borderRadius: "14px" }
export const menuItem = { display: "flex", alignItems: "center" }
export const navLink = { fontSize: "2rem", marginLeft: "0.5rem" }
export const content = { marginLeft: '1rem' }

export const Header = styled.div`
  flex: 1;
  background: #fff;
  margin-bottom: 1rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  padding: 0 2rem;
  justify-content: space-between;
`

export const Main = styled.div`
  flex: 8;
  background: #fff;
  border-radius: 1rem;
  padding: 0 1rem;
  overflow-y: auto;
  height: 100%;
  padding-bottom: 5rem;
`

export const Footer = styled.div`
position: fixed;
right: 0;
bottom: 0;
display: flex;
justify-content: space-between;
align-items: center;
padding: 0 2rem;
border-top: 1px solid #f0f0f0;
background: #fff;
width: 100%;
line-height: 48px;
`
