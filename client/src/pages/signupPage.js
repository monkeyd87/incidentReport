import {Card,Form,FloatingLabel,Button} from "react-bootstrap"
import { useEffect, useState } from "react"
import{useNavigate} from 'react-router-dom'
export const SignUP = ()=>{
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')
    const [username,setUsername]= useState('')
    const[admin,setAdmin] = useState(false)
    const [token,setToken]=useState('')
    const navigate = useNavigate()

    const handleSubmit= async(event)=>{
        event.preventDefault()
        try{
            const responce = await fetch("http://localhost:8000/api/signup",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body: JSON.stringify({email,password,username})
            })

            const data = await responce.json()
            console.log(data)
           if(data.token){
            localStorage.token = data.token
            navigate('/home')
            return
           }
           alert(data.message)

        }catch{
            alert('error')
        }

    }
   

    return(
        <div className='d-flex justify-content-center align-items-center' style={{height:'95vh'}}>
            <Card className="col-lg-3">
                <Card.Header style={{backgroundColor:'rgba(0,29,119,1)',color:'white'}}>SignUP</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <FloatingLabel 
                             controlId="floatingInput"
                             label="Username"
                             className="mb-3"
                        >
                            <Form.Control required onChange={(event)=>setUsername(event.target.value)} type="text" placeholder="name@example.com" value={username}/>
                        </FloatingLabel>
                        <FloatingLabel 
                             controlId="floatingInput"
                             label="Email"
                             className="mb-3"
                        >
                            <Form.Control required onChange={(event)=>setEmail(event.target.value)} type="email" placeholder="name@example.com" value={email}/>
                        </FloatingLabel>

                        <FloatingLabel 
                             controlId="floatingInput"
                             label="Password"
                             className="mb-3"
                        >
                            <Form.Control required onChange={(event)=>setPassword(event.target.value)} type="password" placeholder="Password" value={password}/>
                        </FloatingLabel>

                        <Form.Group className="d-flex gap-1" style={{float:'right'}}>
                            <label>Admin</label>
                            <Form.Check/>

                        </Form.Group>

                      
                       <Button type="submit" disabled={!email&&!password&&!email}>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}