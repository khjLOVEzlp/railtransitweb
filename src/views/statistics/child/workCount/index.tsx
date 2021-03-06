import { useEffect, useState } from "react";
import {
  Form,
  Button,
  Table,
  Radio,
  Select,
  DatePicker,
  List,
  Typography,
} from "antd";
import {
  useDay,
  useLineList,
  useMonth,
  useDownloadDay,
  useDownloadMonth,
} from "./request";
import locale from "antd/es/date-picker/locale/zh_CN";
import { Header, Main, SearchForm } from "components/Styled";
import moment from "moment";

const { Option } = Select;

export const WorkCount = () => {
  const [form] = Form.useForm();
  const [value, setValue] = useState(0);
  const [params, setParams] = useState({
    subwayId: "",
    date: "",
  });

  const { data: lineList, isSuccess } = useLineList();

  useEffect(() => {
    if (isSuccess && lineList.data && lineList.data.length > 0) {
      if (value === 0) {
        setParams({
          ...params,
          date: String(moment().format("YYYY-MM-DD")),
          subwayId: lineList.data[0].id,
        });
      } else {
        setParams({
          ...params,
          date: String(moment().format("YYYY-MM")),
          subwayId: lineList.data[0].id,
        });
      }
    }
  }, [value, isSuccess, lineList?.data]);

  useEffect(() => {
    if (isSuccess && lineList.data && lineList.data.length > 0) {
      form.setFieldsValue({ subwayId: lineList.data[0].id });
    }
  }, [isSuccess, value, form, lineList?.data]);

  const { data: dayList, isLoading: dayLoading } = useDay(params, value);
  const { data: monthList, isLoading: monthLoading } = useMonth(params, value);

  const { mutateAsync: mutaDay } = useDownloadDay();
  const { mutateAsync: mutaMonth } = useDownloadMonth();

  const lineChange = (value: any) => {
    setParams({ ...params, subwayId: value });
  };

  const birthday = (obj: any, time: string) => {
    setParams({ ...params, date: time });
  };

  const birthmoth = (obj: any, time: string) => {
    setParams({ ...params, date: time });
  };

  const onChange = (e: any) => {
    setValue(e.target.value);
    form.resetFields();
  };

  const downDay = () => {
    mutaDay(params).then((blob) => {
      let fileName = params.date + ".doc";
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
    });
  };

  const downMonth = () => {
    mutaMonth(params).then((blob) => {
      let fileName = params.date + ".doc";
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
      window.URL.revokeObjectURL(link.href);
    });
  };

  const dateFormat = "YYYY-MM-DD";
  const monthFormat = "YYYY-MM";

  return (
    <>
      <Header>
        <div className="left"></div>
        <div className="right">????????????</div>
      </Header>
      <Main>
        <SearchForm>
          <Form form={form} name="basic" layout={"inline"}>
            <Radio.Group onChange={onChange} defaultValue={0}>
              <Radio value={0}>??????</Radio>
              <Radio value={1}>??????</Radio>
            </Radio.Group>

            <Form.Item name="subwayId">
              <Select
                style={{ width: 120 }}
                placeholder={"????????????"}
                onChange={lineChange}
                showSearch
                filterOption={(input, option: any) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {lineList?.data.map((item: any) => (
                  <Option value={item.id}>{item.name}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="date"
              initialValue={
                value === 0
                  ? moment(moment().format(), dateFormat)
                  : moment(moment().format(), monthFormat)
              }
            >
              {value === 0 ? (
                <DatePicker
                  locale={locale}
                  onChange={birthday}
                  format={dateFormat}
                />
              ) : (
                <DatePicker
                  locale={locale}
                  picker="month"
                  onChange={birthmoth}
                  format={monthFormat}
                />
              )}
            </Form.Item>
          </Form>

          <div>
            <Button
              onClick={downDay}
              style={{ marginRight: "1rem" }}
              disabled={value === 1}
            >
              ????????????
            </Button>
            <Button onClick={downMonth} disabled={value === 0}>
              ????????????
            </Button>
          </div>
        </SearchForm>
        {/* ?????? */}
        {value === 0 && (
          <div>
            <List header={<div>??????????????????</div>}>
              <List.Item>
                <Typography.Text>
                  ???????????????{dayList?.data?.workDay || "???"}
                </Typography.Text>
                <Typography.Text>
                  ???????????????{dayList?.data?.workNum || "???"}
                </Typography.Text>
                <Typography.Text>
                  ???????????????{dayList?.data?.personNum || "???"}
                </Typography.Text>
              </List.Item>
            </List>

            <List header={<div>????????????????????????</div>}>
              <Table
                rowKey={(key) => key.key}
                dataSource={dayList?.data?.personDayVoList}
                loading={dayLoading}
                pagination={{
                  hideOnSinglePage: true,
                }}
                columns={[
                  {
                    title: "??????",
                    dataIndex: "name",
                  },
                  {
                    title: "????????????",
                    dataIndex: "className",
                  },
                  {
                    title: "?????????",
                    dataIndex: "pleaseStand",
                  },
                  {
                    title: "????????????",
                    dataIndex: "downTime",
                  },
                  {
                    title: "????????????",
                    dataIndex: "returnTime",
                  },
                  {
                    title: "??????",
                    dataIndex: "remark",
                  },
                ]}
              />
            </List>

            <List header={<div>???????????????????????????</div>}>
              <Table
                rowKey={(key) => key.key}
                dataSource={dayList?.data?.toolDayVoList}
                loading={dayLoading}
                pagination={{
                  hideOnSinglePage: true,
                }}
                columns={[
                  {
                    title: "??????",
                    dataIndex: "name",
                  },
                  {
                    title: "????????????",
                    dataIndex: "useNum",
                  },
                  {
                    title: "????????????",
                    dataIndex: "backNum",
                  },
                  {
                    title: "??????",
                    dataIndex: "remark",
                  },
                ]}
              />
            </List>
          </div>
        )}

        {value === 1 && (
          /* ?????? */
          <div>
            <List header={<div>??????????????????</div>}>
              <List.Item>
                <Typography.Text>
                  ???????????????{monthList?.data?.workMonth || "???"}
                </Typography.Text>
                <Typography.Text>
                  ???????????????{monthList?.data?.workNum || "???"}
                </Typography.Text>
                <Typography.Text>
                  ???????????????{monthList?.data?.personNum || "???"}
                </Typography.Text>
              </List.Item>
            </List>

            <List
              header={
                <div>
                  ????????????????????????
                  <span style={{ color: "red", fontSize: "10px" }}>
                    ???????????????=????????????-?????????????????????
                  </span>
                </div>
              }
            >
              <Table
                rowKey={(key) => key.key}
                dataSource={monthList?.data?.personMonthVoList}
                loading={monthLoading}
                pagination={{
                  hideOnSinglePage: true,
                }}
                columns={[
                  {
                    title: "??????",
                    dataIndex: "name",
                  },
                  {
                    title: "???????????????",
                    dataIndex: "workDay",
                  },
                  {
                    title: "??????????????????",
                    dataIndex: "offlineNum",
                  },
                  {
                    title: "????????????",
                    dataIndex: "timeDifference",
                  },
                  {
                    title: "??????",
                    dataIndex: "remark",
                  },
                ]}
              />
            </List>

            <List
              header={
                <div>
                  ???????????????????????????
                  <span style={{ color: "red", fontSize: "10px" }}>
                    ??????????????????=????????????/???????????????
                  </span>
                </div>
              }
            >
              <Table
                rowKey={(key) => key.key}
                dataSource={monthList?.data?.toolMonthVoList}
                loading={monthLoading}
                pagination={{
                  hideOnSinglePage: true,
                }}
                columns={[
                  {
                    title: "??????",
                    dataIndex: "name",
                  },
                  {
                    title: "????????????",
                    dataIndex: "useNum",
                  },
                  {
                    title: "?????????",
                    dataIndex: "useRate",
                  },
                  {
                    title: "??????",
                    dataIndex: "remark",
                  },
                ]}
              />
            </List>
          </div>
        )}
      </Main>
    </>
  );
};
