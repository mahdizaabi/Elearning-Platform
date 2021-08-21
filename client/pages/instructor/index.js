import axios from 'axios';
import InstructorRoute from '../../components/routes/InstructorRoute'

const InstructorIndex = () => {
    return (<>
        <InstructorRoute>
            <h1 className="jumbotron text-center square p-4"> Instructor Dashboard</h1>
        </InstructorRoute>
    </>)

}

export default InstructorIndex;