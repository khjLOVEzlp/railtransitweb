import { Button, Drawer, Table } from "antd";
import { useState } from "react";
import { useQueryClient } from "react-query";
import { noData } from "utils/verification";
import { useWareHouseContext } from "views/warehouse";
import { ToolModalForm } from "./modal/ToolModalForm";
import { useViewTool, useToolModal } from "./util";

export const Tool = ({ name }: { name: string }) => {
  const [param, setParam] = useState({
    index: 1,
    size: 10,
  });
  const { ModalOpen, close, viewTool, isLoading } = useViewTool(param);
  const { startEdit } = useToolModal();
  const queryClient = useQueryClient();
  const { drawerId, setDrawerId } = useWareHouseContext();

  const closeModal = () => {
    setDrawerId(undefined);
    close();
  };

  const handleTableChange = (p: any, filters: any, sorter: any) => {
    setParam({ ...param, index: p.current, size: p.pageSize });
  };

  return (
    <Drawer
      width={800}
      title={name}
      placement="right"
      onClose={closeModal}
      visible={ModalOpen}
    >
      <Table
        dataSource={viewTool?.data}
        pagination={{
          total: viewTool?.count,
          current: param.index,
          pageSize: param.size,
          hideOnSinglePage: true
        }}
        onChange={handleTableChange}
        columns={[
          {
            title: "名称",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "数量",
            dataIndex: "count",
            key: "count",
          },
          {
            title: "性能指标",
            dataIndex: "perfIndex",
            key: "perfIndex",
          },
          {
            title: "规格型号",
            dataIndex: "specsModel",
            key: "specsModel",
          },
          {
            title: "备注",
            dataIndex: "remark",
            key: "remark",
          },
          {
            title: "操作",
            render: (item: any) => (
              <>
                <Button
                  type={"link"}
                  onClick={() => {
                    startEdit(item.id, drawerId);
                    queryClient.invalidateQueries("GetMaterialDetail");
                  }}
                >
                  详情
                </Button>
              </>
            ),
          },
        ]}
        loading={isLoading}
        rowKey={(item) => item.id}
        locale={noData}
      />
      <ToolModalForm />
    </Drawer>
  );
};
