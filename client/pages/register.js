import { useState } from "react";
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const { data } = await axios.post('http://localhost:8001/api/register', { name, email, password })
            toast.success('registration succefull, please login')
        } catch (err) {
            toast.error(err.response.data)
        }
    }
    return (
        <>
            <h1 className="jumbotron bg-primary square text-center p-5 ">Register</h1>
            <div className="container shadow p-3 mb-5 bg-white rounded offset-md-4 col-md-4 pb-3">
                <form action="" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        className="form-control mb-4 p-2" id=""
                        placeholder="Enter name"
                        required
                    />
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

                    <button type="submit" className="btn btn-block w-100 btn-primary ">Submit</button>
                </form>
            </div>
        </>
    )
}


export default Register;