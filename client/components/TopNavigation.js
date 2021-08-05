
import { Menu } from "antd";
import Link from "next/link";
import { AppstoreOutlined, LoginOutlined, UserAddOutlined } from '@ant-design/icons'
import { useEffect, useState } from "react";

const { Item } = Menu;
const TopNavigation = () => {
    const [currentPath, setCurrentPath] = useState('');
    useEffect(() => {
        process.browser && setCurrentPath(window.location.pathname)

    }, [process.browser && window.location.pathname])
    return (
        <Menu mode="horizontal" selectedKeys={[currentPath]}>
            <Item key="/" onClick={(e) => setCurrentPath(e.key)} icon={<AppstoreOutlined />}>
                <Link href="/">
                    <a className={"type"}>App</a>
                </Link>
            </Item>

            <Item key="/login" onClick={(e) => setCurrentPath(e.key)} icon={<LoginOutlined />}>
                <Link href="/login">
                    <a className={"type"}>Login</a>
                </Link>
            </Item>

            <Item key="/regiser " onClick={(e) => setCurrentPath(e.key)} icon={<UserAddOutlined />}>
                <Link href="/register">
                    <a>Register</a>
                </Link>
            </Item>
        </Menu>
    )
}


export default TopNavigation;