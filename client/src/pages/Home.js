
import {Form, FormGroup,Card,FloatingLabel,Button} from 'react-bootstrap'
import {useState,useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { AddStudent } from '../components/AddStudent'
import {Name} from '../components/Name'
import { Incident } from '../components/Incident'
import { useOutletContext } from 'react-router-dom'




export const Home = ()=>{
    const [names,setNames] = useState([])
    const [scholar,setScholar]=useState({id:'',name:''})
    // const [user, setUser] = useState({})
    const [students,setStudents] = useState([])
    const [token,setToken] = useState(localStorage.token)
    const [show,setShow]=useState(false)
    const [formData, setFormData] = useState({
        student: [], // Initialize with an empty string or a default value
        location: [],
        possibleMotivation: [],
        intervention: [],
        briefDescription: '',
        descriptionOfIncident: '',
        author:''
      });

      const initialFormData = {
        student: [],
        location: [],
        possibleMotivation: [],
        intervention: [],
        briefDescription: '',
        descriptionOfIncident: '',
        author: '',
      };

      const [user,setUser] = useOutletContext()


    const handleSubmit = async()=>{
        try{
            const response = fetch('http://localhost:8000/api/student/addReport',{
                headers:{
                    'content-type':'application/json',
                    authorization: 'bearer '+token
                    
                },
                method:'PUT',
                body: JSON.stringify(formData)
            })
            const data = await response.json()
            console.log(data)

        }catch(err){
            console.log(err)
        }
        const checkboxes = document.querySelectorAll('[type="checkbox"]')

        const clear = ()=>{
            checkboxes.forEach(item=>item.checked = false)
        }
        setFormData(initialFormData)
        setNames([])
        clear()

    }
   
    const hide=()=>{
        setShow(false)
    }
    const  getUser = async()=>{
        try{
            const responce = await fetch('http://localhost:8000/api/user/me',{
                headers:{
                    authorization: "bearer "+token
                }
            })
            const data = await responce.json()
            setUser(prev=>data)
            setFormData(prev=>({...prev,author:data._id}))
    
    
        }catch(err){
            console.log(err)
        }

      
    }

    const getStudents = async()=>{
        try{
            const responce = await fetch('api/student',{
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

    const addStudents = ()=>{
        if(!scholar.id)return
        setNames(prev=>[...prev,scholar])
        setFormData(prev=>({...prev,student:[...prev.student,scholar.id]}))
    }



    const removeStudent = (id)=>{
        setNames(prev=> prev.filter(item=>item.id != id))
        setFormData(prev=>({...prev,student:prev.student.filter(item=>item.id != id)}))
    }

    const validation = ()=>{
        if(names&&formData.briefDescription&&formData.descriptionOfIncident){
            return true
        }
        return false
    }

  



    useEffect(()=>{
        getUser()
        getStudents()
    },[])


    if(!token){
        return( <Navigate to='/login'/>)
     }


    return(
        <div>

            <div>
                <h1>Welcome {user.username} </h1>
            </div>
            <Incident/>
        </div>
    )
}
