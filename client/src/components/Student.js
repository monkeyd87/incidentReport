// student componet

import {Card,Figure,Image} from 'react-bootstrap'
import { useState,useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper,faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from 'react-router-dom'
export const Student = ({getStudent,_id,firstname,lastname,grade,...props})=>{
    const [update,setUpdate ] = useState(0)
    const navigate = useNavigate()


   
    const handleClick=()=>{

        navigate('/student/'+_id)
    }


    const deleteStudent = async()=>{
       
        const sure =  window.confirm('Are you sure you want to delete student all data will be lost')
        if(sure){
            try{
                const response = await fetch('https://wlcpincidentreport-b83c7d609aa0.herokuapp.com/api/student/'+_id,{
                    headers:{
                        authorization: "bearer "+localStorage.token
                    },
                    method:'DELETE'
    
                })
                
                await getStudent()

            }catch{
                console.log('error')
                alert('failed to fetch')
            }
        }
            
    }
   
    
    return(

          <Card  className="col-12 col-md-6 col-lg-4 bg-light shadow"  >
            <Card.Header style={{backgroundColor:'rgba(0,29,119,1)',color:'white'}}>
                <div className='d-flex justify-content-between'>
            <FontAwesomeIcon size='lg' icon={faNewspaper}/>
                <h4>{grade}</h4>

                </div>
            </Card.Header>
            <Card.Body className='d-flex flex-column flex-lg-row p-2 gap-1' style={{overflow:'hidden'}}>
                <div onClick={handleClick} role="button"className='d-flex'style={{minHeight:'100px',minWidth:'100px',maxHeight:'100px',maxWidth:'100px'}}>
                    <Image className='h-100'src='https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg' thumbnail/>
                </div>
                <div className='d-flex align-items-center gap-3' >
                    <h3>{firstname} {lastname}</h3>
                    

                </div>
        
            </Card.Body>
            <Card.Footer className='d-flex justify-content-end'>
                <FontAwesomeIcon  role="button" onClick={deleteStudent} icon={faTrashAlt}/>
            </Card.Footer>
          </Card>

    )
}