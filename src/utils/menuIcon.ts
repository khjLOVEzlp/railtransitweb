/* 侧边栏icon图标 */
import {
  FileSearchOutlined,
  AppstoreOutlined,
  ClockCircleOutlined,
  ApartmentOutlined,
  TabletOutlined,
  DeploymentUnitOutlined,
  ShakeOutlined,
  PushpinOutlined,
  BorderOutlined,
  ApiOutlined,
  NodeIndexOutlined,
  CustomerServiceOutlined,
  UsergroupAddOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  AlertOutlined,
  BarChartOutlined,
  PieChartOutlined,
  UserOutlined,
  MenuOutlined,
  LoginOutlined,
  SecurityScanOutlined,
  DatabaseOutlined,
  NodeExpandOutlined,
  ToolOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
} from '@ant-design/icons';

export const menuIcon = (menuList: any) => {
  menuList.forEach((item: any) => {
    const url = item.url
    switch (url) {
      case "planWork":
        item["icon"] = FileSearchOutlined
        break;

      case "planType":
        item["icon"] = AppstoreOutlined
        break;

      case "workManage":
        item["icon"] = ClockCircleOutlined
        break;

      case "seperate":
        item["icon"] = ApartmentOutlined
        break;

      case "alcohol":
        item["icon"] = ApiOutlined
        break;

      case "sim":
        item["icon"] = TabletOutlined
        break;

      case "label":
        item["icon"] = DeploymentUnitOutlined
        break;

      case "temperater":
        item["icon"] = ShakeOutlined
        break;

      case "platfrom":
        item["icon"] = PushpinOutlined
        break;

      case "rfid":
        item["icon"] = BorderOutlined
        break;

      case "safehat":
        item["icon"] = CustomerServiceOutlined
        break;

      case "blood":
        item["icon"] = NodeIndexOutlined
        break;

      case "personManage":
        item["icon"] = UsergroupAddOutlined
        break;

      case "spiritStatus":
        item["icon"] = ExclamationCircleOutlined
        break;

      case "workCount":
        item["icon"] = FileTextOutlined
        break;

      case "workWarn":
        item["icon"] = AlertOutlined
        break;

      case "workPerson":
        item["icon"] = BarChartOutlined
        break;

      case "personMind":
        item["icon"] = PieChartOutlined
        break;

      case "user":
        item["icon"] = UserOutlined
        break;

      case "role":
        item["icon"] = UsergroupAddOutlined
        break;

      case "menu":
        item["icon"] = MenuOutlined
        break;

      case "log":
        item["icon"] = LoginOutlined
        break;

      case "department":
        item["icon"] = SecurityScanOutlined
        break;

      case "dataDictionary":
        item["icon"] = DatabaseOutlined
        break;

      case "line":
        item["icon"] = NodeExpandOutlined
        break;

      case "toolType":
        item["icon"] = DatabaseOutlined
        break;

        case "app":
        item["icon"] = ArrowUpOutlined
        break;

      case "materialType":
        item["icon"] = ToolOutlined
        break;

      case "inWarehouse":
        item["icon"] = ArrowDownOutlined
        break;

      case "outWarehouse":
        item["icon"] = ArrowUpOutlined
        break;

      default:
        break;
    }
  })

  return menuList
}