
import {Form, FormGroup,Card,FloatingLabel,Button,ToastContainer,Toast} from 'react-bootstrap'
import {useState,useEffect} from 'react'
import { Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import {Name} from '../components/Name'
import { AddStudent } from '../components/AddStudent'




export const Incident = (props)=>{
    const [names,setNames] = useState([])
    const [scholar,setScholar]=useState({id:'',name:''})
    const [showA,setShowA] = useState(false)

    const [students,setStudents] = useState([])
    const [token,setToken] = useState(localStorage.token)

    const [formData, setFormData] = useState({
        student: [], // Initialize with an empty string or a default value
        location: [],
        possibleMotivation: [],
        intervention: [],
        briefDescription: '',
        descriptionOfIncident: '',
        author:props._id
      });

      const initialFormData = {
        student: [],
        location: [],
        possibleMotivation: [],
        intervention: [],
        briefDescription: '',
        descriptionOfIncident: '',
        author: props._id,
      };

      const addStudents = ()=>{
        if(!scholar.id)return
        if(!formData.student.includes(scholar.id)){
            setNames(prev=>[...prev,scholar])
            setFormData(prev=>({...prev,student:[...prev.student,scholar.id]}))  
        }
    }

    const handleSubmit = async()=>{
        try{
            const response = fetch('api/student/addReport',{
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
        setTimeout(()=>{
            setShowA(true)
        },100)

    }
   
   const updateStudent = (student)=>{
        setStudents(prev=>[...prev,student])
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

   



    const removeStudent = (id)=>{
        setNames(prev=> prev.filter(item=>item.id != id))
        setFormData(prev=>({...prev,student:prev.student.filter(item=>item.id != id)}))
    }

   

  



    useEffect(()=>{
        getStudents()
    },[])
    return(<>
              <ToastContainer position={"middle-center"} style={{position:'absolute'}}>
                    <Toast className='shadow' bg='success' onClose={() => setShowA(false)} show={showA} delay={1000} autohide>
                        <Toast.Body>
                            
                            <h4 className='text-light text-center'>Incident Added</h4>
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
            <div>
                <div className='d-flex justify-content-center'>
                    <Card className=' d-flex col-12 col-md-6 col-lg-6' >
                        <Card.Header style={{backgroundColor:'rgba(0,29,119,1)',color:'white'}}>CLASSROOM INCIDENT REPORT</Card.Header>
                        <div className='m-3 d-flex gap-1 justify-content-between'>
                            <div className='w-75 d-flex flex-column flex-lg-row flex-md-row  gap-1'>

                                <select onChange={(event)=>{
                                    const id =event.target.value
                                    const index = event.target.selectedIndex
                                    if(index < 1){
                                        return
                                    }
                                    
                                    setScholar(prev=>({...prev,id:id,name:students[index-1].firstname}))
                                        
                                    
                                    }} className='w-100 rounded border-secondary'>
                                    <option >Select Student</option>
                                    {students.map(student=>{
                                        return(
                                            <option value={student._id} key={student._id} id={student._id}> {student.firstname} {student.lastname}-{student.grade}</option>
                                        )
                                    })}
                                </select>
                                <Button onClick={addStudents}size='sm'>add</Button>   
                            </div>
                            <div>
                                <AddStudent getStudents={updateStudent}/>
                            </div>
                        </div>
                        <Card.Body>

                            <Form className='d-flex flex-column gap-3'>
                            <div className=' name-container d-flex align-items-center p-1 bg-light w-100   border rounded ' style={{height:'50px'}}>
                                {names.map(name=>{
                                    return(
                                        <Name id={name.id}onDelete={removeStudent} grade={name.grade}name={name.name}/>
                                    )
                                })}
                            </div>
                                
                                <div className='d-flex flex-column flex-sm-column flex-md-row justify-content-center gap-3'>

                                    <div className='border '>
                                        <strong>LOCATION</strong>
                                        <div className='location'>
                                            <Form.Check
                                                label='Room'
                                                value='Room'
                                                onChange={(event) => {
                                                    const location = event.target.value;
                                                    setFormData((prevData) => ({
                                                    ...prevData,
                                                    location: event.target.checked
                                                        ? [...prevData.location, location]
                                                        : prevData.location.filter((item) => item !== location),
                                                    }));
                                                }}
                                            />
                                            <Form.Check
                                                label='Hallway'
                                                value='Hallway'
                                                onChange={(event) => {
                                                    const location = event.target.value;
                                                    setFormData((prevData) => ({
                                                        ...prevData,
                                                        location: event.target.checked
                                                        ? [...prevData.location, location]
                                                        : prevData.location.filter((item) => item !== location),
                                                    }));
                                                    }}

                                            />
                                            <Form.Check
                                                label='playground'
                                                value="Playground"
                                                onChange={(event) => {
                                                    const location = event.target.value;
                                                    setFormData((prevData) => ({
                                                        ...prevData,
                                                        location: event.target.checked
                                                        ? [...prevData.location, location]
                                                        : prevData.location.filter((item) => item !== location),
                                                    }));
                                                    }}
                                            />
                                            <Form.Check
                                                label='Basketball court'
                                                value="Basketball court"
                                                onChange={(event) => {
                                                    const location = event.target.value;
                                                    setFormData((prevData) => ({
                                                        ...prevData,
                                                        location: event.target.checked
                                                        ? [...prevData.location, location]
                                                        : prevData.location.filter((item) => item !== location),
                                                    }));
                                                    }}
                                            />
                                            <Form.Check
                                                label='Track'
                                                value="Track"
                                                onChange={(event) => {
                                                    const location = event.target.value;
                                                    setFormData((prevData) => ({
                                                        ...prevData,
                                                        location: event.target.checked
                                                        ? [...prevData.location, location]
                                                        : prevData.location.filter((item) => item !== location),
                                                    }));
                                                    }}
                                            />
                                            <Form.Check
                                                label='Caferteria'
                                                value="Caferteria"
                                                onChange={(event) => {
                                                    const location = event.target.value;
                                                    setFormData((prevData) => ({
                                                        ...prevData,
                                                        location: event.target.checked
                                                        ? [...prevData.location, location]
                                                        : prevData.location.filter((item) => item !== location),
                                                    }));
                                                    }}
                                            />
                                            <Form.Check
                                                label='Restroom'
                                                value="Restroom"
                                                onChange={(event) => {
                                                    const location = event.target.value;
                                                    setFormData((prevData) => ({
                                                        ...prevData,
                                                        location: event.target.checked
                                                        ? [...prevData.location, location]
                                                        : prevData.location.filter((item) => item !== location),
                                                    }));
                                                    }}
                                            />
                                            <Form.Check
                                                label='OffCampus'
                                                value="Offcampus"
                                                onChange={(event) => {
                                                    const location = event.target.value;
                                                    setFormData((prevData) => ({
                                                        ...prevData,
                                                        location: event.target.checked
                                                        ? [...prevData.location, location]
                                                        : prevData.location.filter((item) => item !== location),
                                                    }));
                                                    }}
                                            />
                                        
                                        </div>
                                    </div>
                                    <div className='border d-flex flex-column'>
                                        <strong>POSSIBLE MOTIVATION</strong>
                                        <div className='location'>
                                        <Form.Check
                                                label='Obtain Peer Attention'
                                                value="Obtain Peer Attention"
                                                onChange={(event) => {
                                                    const possibleMotivation = event.target.value;
                                                    setFormData((prevData) => ({
                                                    ...prevData,
                                                    possibleMotivation: event.target.checked
                                                        ? [...prevData.possibleMotivation, possibleMotivation]
                                                        : prevData.possibleMotivation.filter((item) => item !== possibleMotivation),
                                                    }));
                                                }}
                                            />
                                            <Form.Check
                                                label='Obtain Staff Attention'
                                                value='Obtain Staff Attention'
                                                onChange={(event) => {
                                                    const possibleMotivation = event.target.value;
                                                    setFormData((prevData) => ({
                                                    ...prevData,
                                                    possibleMotivation: event.target.checked
                                                        ? [...prevData.possibleMotivation, possibleMotivation]
                                                        : prevData.possibleMotivation.filter((item) => item !== possibleMotivation),
                                                    }));
                                                }}
                                            />
                                            <Form.Check
                                                label='Avoid Task'
                                                value="Avoid Task"
                                                onChange={(event) => {
                                                    const possibleMotivation = event.target.value;
                                                    setFormData((prevData) => ({
                                                    ...prevData,
                                                    possibleMotivation: event.target.checked
                                                        ? [...prevData.possibleMotivation, possibleMotivation]
                                                        : prevData.possibleMotivation.filter((item) => item !== possibleMotivation),
                                                    }));
                                                }}
                                            />
                                            <Form.Check
                                                label='Avoid peer'
                                                value="Avoid Peer"
                                                onChange={(event) => {
                                                    const possibleMotivation = event.target.value;
                                                    setFormData((prevData) => ({
                                                    ...prevData,
                                                    possibleMotivation: event.target.checked
                                                        ? [...prevData.possibleMotivation, possibleMotivation]
                                                        : prevData.possibleMotivation.filter((item) => item !== possibleMotivation),
                                                    }));
                                                }}
                                            />
                                            <Form.Check
                                                label='Avoid Adult'
                                                value="Avoid Adult"
                                                onChange={(event) => {
                                                    const possibleMotivation = event.target.value;
                                                    setFormData((prevData) => ({
                                                    ...prevData,
                                                    possibleMotivation: event.target.checked
                                                        ? [...prevData.possibleMotivation, possibleMotivation]
                                                        : prevData.possibleMotivation.filter((item) => item !== possibleMotivation),
                                                    }));
                                                }}
                                            />
                                        
                                        </div>
                                    </div>
                                    <div className='border flex-column '>
                                        <strong className='text-center'>INTERVENTIONS</strong>
                                        <div className='location d-flex flex-column'>
                                        <Form.Check
                                                label='Verbal Reminder'
                                                value='Verbal Reminder'
                                                onChange={(event) => {
                                                    const interventions = event.target.value;
                                                    setFormData((prevData) => ({
                                                    ...prevData,
                                                    intervention: event.target.checked
                                                        ? [...prevData.intervention, interventions]
                                                        : prevData.intervention.filter((item) => item !== interventions),
                                                    }));
                                                }}
                                            />
                                            <Form.Check
                                                label='GOAL Reminder'
                                                value='GOAL Reminder'
                                                onChange={(event) => {
                                                    const interventions = event.target.value;
                                                    setFormData((prevData) => ({
                                                    ...prevData,
                                                    intervention: event.target.checked
                                                        ? [...prevData.intervention, interventions]
                                                        : prevData.intervention.filter((item) => item !== interventions),
                                                    }));
                                                }}
                                            />
                                            <Form.Check
                                                label='Loss of Dojo'
                                                value="Loss of Dojo"
                                                onChange={(event) => {
                                                    const interventions = event.target.value;
                                                    setFormData((prevData) => ({
                                                    ...prevData,
                                                    intervention: event.target.checked
                                                        ? [...prevData.intervention, interventions]
                                                        : prevData.intervention.filter((item) => item !== interventions),
                                                    }));
                                                }}
                                            />
                                            <Form.Check
                                                label='Change of seat'
                                                value='Change of seat'
                                                onChange={(event) => {
                                                    const interventions = event.target.value;
                                                    setFormData((prevData) => ({
                                                    ...prevData,
                                                    intervention: event.target.checked
                                                        ? [...prevData.intervention, interventions]
                                                        : prevData.intervention.filter((item) => item !== interventions),
                                                    }));
                                                }}
                                            />
                                        
                                            <Form.Check
                                                label='Loss of (Recess/Chrome)'
                                                value="Loss of (recess/Chrome)"
                                                onChange={(event) => {
                                                    const interventions = event.target.value;
                                                    setFormData((prevData) => ({
                                                    ...prevData,
                                                    intervention: event.target.checked
                                                        ? [...prevData.intervention, interventions]
                                                        : prevData.intervention.filter((item) => item !== interventions),
                                                    }));
                                                }}
                                            />
                                            <Form.Check
                                                label='Restroom'
                                                value='Restroom'
                                                onChange={(event) => {
                                                    const interventions = event.target.value;
                                                    setFormData((prevData) => ({
                                                    ...prevData,
                                                    intervention: event.target.checked
                                                        ? [...prevData.intervention, interventions]
                                                        : prevData.intervention.filter((item) => item !== interventions),
                                                    }));
                                                }}
                                            />
                                            <Form.Check
                                                label='Break'
                                                value="break"
                                                onChange={(event) => {
                                                    const interventions = event.target.value;
                                                    setFormData((prevData) => ({
                                                    ...prevData,
                                                    intervention: event.target.checked
                                                        ? [...prevData.intervention, interventions]
                                                        : prevData.intervention.filter((item) => item !== interventions),
                                                    }));
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <FloatingLabel 
                                controlId="floatingInput"
                                label="Brief Description"
                                className="mb-3"
                            >
                                <Form.Control required  type="text" placeholder="Brief Description"
                                    onChange={(event)=>{
                                        const description = event.target.value
                                        setFormData(prev=>(
                                            {...prev,briefDescription:description}
                                        ))
                                    }}
                                    value={formData.briefDescription}
                                
                                />
                            </FloatingLabel>
                                <FloatingLabel controlId="floatingTextarea2" label="Description of Incident">
                                    <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    style={{ height: '100px' }}
                                    onChange={(event)=>{
                                        const incident = event.target.value
                                        setFormData(prev=>(
                                            {...prev,descriptionOfIncident:incident}
                                        ))
                                    }}
                                    value={formData.descriptionOfIncident}
                                    />
                                </FloatingLabel>
                            </Form>
                            <Button onClick={handleSubmit} disabled={names.length>0&& formData.briefDescription.length >0 && formData.descriptionOfIncident.length >0 ?false:true}>Submit</Button>
                        </Card.Body>
                    </Card>
                </div>
            
            </div>
    </>
    )
}
