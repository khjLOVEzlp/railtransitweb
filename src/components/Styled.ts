import styled from "@emotion/styled";

export const layout = { height: "100%", borderRadius: "14px" };
export const paddingLayout = { padding: "15px" };
export const sider = { height: "100%", paddingTop: "5rem", background: '#00225C' };
export const menuStyle = {background: '#00225C'};
export const menuItem = { display: "flex", alignItems: "center", };
export const navLink = { fontSize: "1.5rem", marginLeft: "0.5rem" };
export const content = { marginLeft: "1rem" };

export const Header = styled.div`
  flex: 1;
  // margin-bottom: 1rem;
  display: flex;
  align-items: center;
  .left {
    width: 5px;
    height: 20px;
    background: #1961ac;
  }
  .right {
    margin-left: 5px;
    color: #333;
    font-size: 17px;
    font-weight: bold;
  }
`;

export const Main = styled.div`
  flex: 10;
  background: #fff;
  border-radius: 1rem;
  padding: 0 1rem;
  overflow-y: auto;
  height: 100%;
  // padding-bottom: 5rem;
  box-shadow: 0px 0px 8px 0px rgba(87, 87, 87, 0.15);
`;

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
`;

export const SearchForm = styled.div`
  padding: 20px 0;
  display: flex;
  justify-content: space-between;
`;
