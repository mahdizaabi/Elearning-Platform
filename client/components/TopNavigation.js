
import { Menu } from "antd";
import Link from "next/link";
import { AppstoreOutlined, CoffeeOutlined, LoginOutlined, LogoutOutlined, UserAddOutlined } from '@ant-design/icons'
import { useState, useEffect, useContext } from "react";
import { Context } from '../context'
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import SubMenu from "antd/lib/menu/SubMenu";
const { Item } = Menu;

const TopNavigation = () => {

    const [currentPath, setCurrentPath] = useState("");

    const { state, dispatch } = useContext(Context);

    const { user } = state;


    const router = useRouter();
    useEffect(() => {
        process.browser && setCurrentPath(window.location.pathname)

    }, [process.browser && window.location.pathname])



    const logout = async () => {
        try {
            dispatch({
                type: "LOGOUT"
            })
            window.localStorage.removeItem('currentUser');
            const { data } = await axios.get("/api/logout");
            router.push('/login')

        } catch (e) {
            toast(e.data)
        }

    }
    return (
        <Menu className="" mode="horizontal" selectedKeys={[currentPath]}>
            <Item key="/" onClick={(e) => setCurrentPath(e.key)} icon={<AppstoreOutlined />}>
                <Link href="/">
                    <a className={"type"}>App</a>
                </Link>
            </Item>

            {!user && <>

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
            </>}

            {user &&
                <SubMenu key="submenu" icon={<CoffeeOutlined />} title={user?.name} className="float-right">

                    <Item onClick={() => logout()} icon={<LogoutOutlined />}>
                        <a>avatart</a>
                    </Item>

                    <Item onClick={() => logout()} icon={<LogoutOutlined />}>
                        <a>Logout</a>
                    </Item>
                </SubMenu>

            }
        </Menu>
    )
}


export default TopNavigation;