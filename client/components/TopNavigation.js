
import {Menu} from "antd";
import Link from "next/link";
import {AppstoreOutlined, LoginOutlined, UserAddOutlined} from '@ant-design/icons'

const {Item} = Menu;
const TopNavigation = () => {
    return (
        <Menu mode="horizontal">
            <Item icon={<AppstoreOutlined />}>
                <Link href="/">
                    <a className={"type"}>App</a>
                </Link>
            </Item>

            <Item icon={<LoginOutlined />}> 
                <Link href="/login">
                    <a className={"type"}>Login</a>
                </Link>
            </Item>

            <Item icon={<UserAddOutlined/>}>
                <Link href="/register">
                    <a>Register</a>
                </Link>
            </Item>
        </Menu>
    )
}


export default TopNavigation;