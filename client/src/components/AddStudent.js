import {Form,Modal,FloatingLabel,Button,Toast,ToastContainer} from 'react-bootstrap'
import {useState} from 'react'
    
export const AddStudent = ({getStudents,onHide,...props})=>{

    const [showA,setShowA] = useState(false)
    const [show,setShow] = useState(false)

    const [student,setStudent] = useState({
        firstname:'',
        lastname:'',
        grade:''
    })

    const [token] = useState(localStorage.token)

    const clear = ()=>{
        setStudent({
            firstname:'',
            lastname:'',
            grade:''
        })
        document.querySelector('select').value = ''
    }

    const handleClick =()=>{
        setShow(true)
    }



    const handleSubmit=async()=>{
        try{
            const response =  await fetch('http://localhost:8000/api/student',
            {   
                method:'POST',
                headers:{
                    "content-type": "application/json",
                    authorization: "bearer "+token
    
                },
                body: JSON.stringify(student)
            })
            const data =  await response.json()
            getStudents(data)

            
        }catch(err){
            console.log(err)
        }
        clear()
        setShow(false)
        setTimeout(()=>{
            setShowA(true)
        },100)
    }

    return(
        <>

                <ToastContainer position={"top-center"} style={{position:'absolute'}}>
                    <Toast bg='warning' onClose={() => setShowA(false)} show={showA} delay={1000} autohide>
                        <Toast.Body>
                            <p>Student Added</p>
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
            <Modal show={show} onHide={()=>setShow(false)}>
                <Modal.Header closeButton>Add Student</Modal.Header>
                <Modal.Body>

                <Form >
                                <select onChange={(event)=>{
                                        const grades = event.target.value
                                        setStudent(perv=>({...perv,grade:grades}))
                                    }}
                                    >
                                <option value="">Select Grade</option>
                                <option value="K">K</option>
                                <option value='1' >1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                                <option value='7'>7</option>
                                <option value='8'>8</option>
                                </select> 
                            <FloatingLabel 
                                controlId="floatingInput"
                                label="First Name"
                                className="mb-3"
                            >
                                <Form.Control required  type="text" placeholder="firstname" 
                                    onChange={(event)=>{
                                        const firstName = event.target.value
                                        setStudent(perv=>({...perv,firstname:firstName}))
                                    }}
                                    value={student.firstname}
                                />
                            </FloatingLabel>
                            <FloatingLabel 
                                controlId="floatingInput"
                                label="Last Name"
                                className="mb-3"
                            >
                                <Form.Control required  type="text" placeholder="name@example.com"
                                    onChange={(event)=>{
                                        const lastName = event.target.value
                                        setStudent(perv=>({...perv,lastname:lastName}))
                                    }}
                                    value={student.lastname}
                                />
                            </FloatingLabel>

                            

                        
                        <Button onClick={handleSubmit}>Submit</Button>
                        </Form>
                </Modal.Body>
            </Modal>
            <Button style={{float:'right'}}onClick={handleClick}>Add Student</Button>
        </>
    )
}