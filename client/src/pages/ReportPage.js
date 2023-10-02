import {useState,useEffect} from 'react'
import {Card,InputGroup,Form} from 'react-bootstrap'
import {Report} from '../components/Report'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export const ReportsPage = ()=>{

    const [token] = useState(localStorage.token)
    const [reports,setReports] = useState([])
    const [query,setQuery]= useState('')

    const getReports = async() =>{
        try{
            const res = await fetch('api/reports',{
                headers:{
                    authorization: "bearer "+token
                }
            })
            const data = await res.json()
            
            setReports(prev=>[...data])
        }catch(err){

        }
    }
    const deleteReport = async(id)=>{
        try{
            const res = await fetch("https://wlcpincidentreport-b83c7d609aa0.herokuapp.com/api/reports/"+id,{
                headers:{
                    authorization: "bearer "+token
                },
                method:'DELETE'
            })
        }catch{
            console.log('failed to fetch')
        }
        await getReports()
        

    }

    useEffect(()=>{
        getReports()
    },[])

    const filterList =  reports.filter(item=>item.briefDescription.toLowerCase().includes(query.toLowerCase()))


    return(
       <div className="w-100">
        <Card className='col-3'>
                <Card.Body>
                    <InputGroup>
                        <InputGroup.Text><FontAwesomeIcon icon={faSearch}/></InputGroup.Text>
                        <Form.Control value={query}  onChange={(event=>setQuery(event.target.value))}type='text'/>

                    </InputGroup>
                   
                   
                </Card.Body>
            </Card>
        <h1>Reports</h1>
        <div className="report-container gap-1 d-flex justify-content-center w-100  flex-wrap flex-column flex-lg-row flex-md-row">
            {filterList.map(item=>{
                return(
                    <Report remove={deleteReport} {...item}/>
                )
            })}

        </div>

       </div>
    )
}