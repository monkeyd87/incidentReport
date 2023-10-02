

import io from 'socket.io-client';
import { useEffect,useState } from 'react';
import { Student } from '../components/Student';
import {useParams} from 'react-router-dom'


export const ClassroomPage= (props)=>{
  const {class_id}  = useParams()
  console.log(class_id)
  const socket = io('http://localhost:8000'); // Replace with your server URL
  // const [students, setStudents] = useState([])
  const [classroom,setClassroom] = useState({})


  const updateStatus = (id) =>{
    
    socket.emit('update',id)
   
  }

  
   

  

    useEffect(() => {

    socket.connect()
    socket.on('connect',()=>{
      socket.emit('joinClass',class_id)
    })

    socket.on('joinedClass',async(data)=>{
       setClassroom(prev=>{
        return {...data}
      })

     
    })

    socket.on('updated',()=>{
      
    })
   
   
     return ()=> socket.disconnect()
     
      
      }, []);

      

    return(
          <div className='d-flex gap-3 flex-wrap'>
            <h1 className='text-center'>{classroom.name}</h1>
         <div className='d-flex w-100'>
         {
          classroom.students && classroom.students.map(student=>{

            return <Student key={student._id} id={student._id} name={student.firstname} isDismissed={student.dismissed} onClick={updateStatus} />
          })
         }
         </div>
        
          </div>

        
    )
}