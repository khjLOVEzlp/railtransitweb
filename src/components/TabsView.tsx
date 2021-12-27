import { Tabs } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";
const { TabPane } = Tabs;

// const initialPanes = [
//   { title: "Tab 1", content: "Content of Tab 1", key: "1", closable: false },
//   { title: "Tab 2", content: "Content of Tab 2", key: "2" },
//   { title: "Tab 3", content: "Content of Tab 3", key: "3" },
// ];

export const TabsView = (props: any) => {
  const navigate = useNavigate();

  const { tabList } = props;
  const [param, setParam] = useState({
    activeKey: tabList[0].id,
    panes: tabList,
  });

  const onChange = (activeKey: any) => {
    setParam({ ...param, activeKey });
    navigate("/plan/" + activeKey);
  };

  const onEdit = (targetKey: any, action: any) => {
    console.log(targetKey, action);
    remove(targetKey);
    // this[action](targetKey);
  };

  const remove = (targetKey: any) => {
    const { panes, activeKey } = param;
    let newActiveKey = activeKey;
    let lastIndex: number;
    panes.forEach((pane: any, i: number) => {
      if (pane.id === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = panes.filter((pane: any) => pane.id !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      //   if (lastIndex >= 0) {
      //     newActiveKey = newPanes[lastIndex].key;
      //   } else {
      //     newActiveKey = newPanes[0].key;
      //   }
      newActiveKey = newPanes[0].id;
    }
    setParam({
      panes: newPanes,
      activeKey: newActiveKey,
    });
  };
  return (
    <Tabs
      hideAdd
      type="editable-card"
      onChange={onChange}
      activeKey={param.activeKey}
      onEdit={onEdit}
    >
      {param.panes.map((pane: any) => (
        <TabPane tab={pane.name} key={pane.url} closable={pane.closable} />
      ))}
    </Tabs>
  );
};
