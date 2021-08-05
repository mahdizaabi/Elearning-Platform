import { useState } from "react";


const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault()
        console.table(email, name, password)
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