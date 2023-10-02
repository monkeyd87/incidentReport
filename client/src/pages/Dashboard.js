import {Card,Col,Row,Form,InputGroup} from 'react-bootstrap'
import {useState,useEffect,useContext} from 'react'
import { Student } from '../components/Student'
import { Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSearch } from '@fortawesome/free-solid-svg-icons'



export const Dashboard = ({context})=>{
    const [query,setQuery] = useState('')
    const [filter,setFilter] = useState([])

    const [students,setStudents] = useState([])
    const [token] = useState(localStorage.token)

    const getStudents = async()=>{
        try{
            const responce = await fetch('http://localhost:8000/api/student',{
                headers:{
                    authorization: "bearer "+token
                }
            })
            const data = await responce.json()
            console.log(data)
            setStudents(prev=>data)

        }catch{
            console.log('error')
        }
    }

    const filterList =  students.filter(item=>item.firstname.toLowerCase().includes(query.toLowerCase())||item.lastname.toLowerCase().includes(query.toLowerCase()))
    
    useEffect(()=>{
        getStudents()
        
    },[])
    
    if(!token){
       return <Navigate to="/login"/>
        
    }
    return(
        <div>
            <Card className='col-3'>
                <Card.Body>
                    <InputGroup>
                        <InputGroup.Text><FontAwesomeIcon icon={faSearch}/></InputGroup.Text>
                        <Form.Control value={query}  onChange={(event=>setQuery(event.target.value))}type='text'/>

                    </InputGroup>
                   
                   
                </Card.Body>
            </Card>
            <div className='d-flex gap-3 flex-column flex-md-row flex-lg-row  flex-wrap align-items-center justify-content-center'>
                {filterList.sort((a,b)=>a.incidentReports.length>b.incidentReports.length).map(student=>{
                    return(
                        <Student getStudent={getStudents}key={student._id} grade={student.grade} _id={student._id} firstname={student.firstname} lastname={student.lastname}/>
                    )
                })}
            </div>

        </div>
    )
}