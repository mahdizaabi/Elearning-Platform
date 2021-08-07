import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';

import { SyncOutlined } from '@ant-design/icons';
const UserRoute = ({ children }) => {


    const router = useRouter()
    const [hidden, setHidden] = useState(true);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data } = await axios.get('/api/current-user');
                if (data.ok) {
                    setHidden(false)
                }
            }
            catch (e) {
                setHidden(true);
                console.log(e);
                router.push('/login');
            }
        }
        fetchUser();
    }, [])
    return (
        <>
            {hidden ? <SyncOutlined spin className="d-flex justify-content-center text-center p-4"></SyncOutlined> :

                (<> {children} </>)
            }
        </>
    )
}

export default UserRoute;