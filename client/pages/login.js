import { useState } from "react";
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import { SyncOutlined } from "@ant-design/icons";
import Link from 'next/link';
const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true);
            const { data } = await axios.post(`api/login`, { email, password })
            console.log(data)
            setLoading(false)
            toast.success('registration succefull, please login')
        } catch (err) {
            toast.error(err.response.data);
            setLoading(false);
        }
    }
    return (
        <>
            <h1 className="jumbotron bg-primary square text-center p-5 ">Login</h1>
            <div className="container shadow p-3 mb-5 bg-white rounded offset-md-4 col-md-4 pb-3">
                <form action="" onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name=""
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        className="form-control mb-4 p-2" id=""
                        placeholder="Enter email"
                        required
                    />
                    <input
                        type="password"
                        name=""
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        className="form-control mb-4 p-2" id=""
                        placeholder="Enter password"
                        required
                    />

                    <button type="submit"
                        className="btn btn-block w-100 btn-primary"
                        disabled={!email || !password || loading}
                    > {loading ? <SyncOutlined spin /> : "Submit"}

                    </button>
                </form>

                <p className="text-center p-3">
                    Not yet registred ?{" "}
                    <Link href="/register">
                        <a>Register</a>
                    </Link>
                </p>
            </div>
        </>
    )
}


export default Login;