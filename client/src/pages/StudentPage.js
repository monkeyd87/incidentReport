import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container,Modal,Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {Report} from '../components/Report'
import {} from '@fortawesome/free-solid-svg-icons'

export const StudentPage = ()=>{

    const [student,setStudent] = useState({})
    const [show,setShow] = useState(false)

    const [token] =useState(localStorage.token)
    const {id} = useParams()


    const remove = async(reportId)=>{
        const response = await fetch('api/student/'+id+'/report/'+reportId+"/remove",{
            headers:{
                authorization: "bearer "+token
            },
            method:'PUT'
        })
        await getStudent()

    }


    const getStudent = async()=>{
        try{
            const response = await fetch('api/student/'+id,{
                headers:{
                    authorization: "bearer "+token

                }
            
            })
            const data = await response.json()
            console.log(data)
            setStudent(prev=>data)
        }catch(err){
            console.log(err)
        }
        console.log(student)
    }

   

   

    useEffect(()=>{
        getStudent()
    },[])

    return(
        <Container>
            <div className=" m-3 rounded">
                <h1 className="text-dark">{student.firstname} {student.lastname}</h1>
            </div>
            <div className="border m-3 gap-1 bg-light border border-secondary d-flex justify-content-around flex-wrap rounded">
                {student.incidentReports&&student.incidentReports.map(item=>{
                    return(
                        <Report remove={remove} {...item}/>
                    )
                })}
            </div>
           

        </Container>
    )
}