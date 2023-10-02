
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Container,Modal,Accordion } from "react-bootstrap";
import {useState} from 'react'


export const Report = ({remove,...props})=>{

    const [show,setShow] = useState(false)

    const onHide= ()=>{
        setShow(false)

    }


    const handleShow = (data)=>{
        setShow(prev=>true)
    }


    return(
        <div  className="  gap-3 rounded col-12 col-lg-6  d-flex p-3"  style={{backgroundColor:'rgba(0,29,119,1)'}}>
            <div className=" rounded bg-light d-flex justify-content-center align-items-center" style={{width:'100px',height:'100px'}}><FontAwesomeIcon onClick={handleShow} role="button"size='xl' icon={faNewspaper}/></div>
            <div className=' w-75 justify-content-center d-flex rounded bg-light border border-3 p-3'>
                <h4>{props.briefDescription?props.briefDescription:'missing description'}</h4>
            </div>
                <div className='d-flex justify-content-center align-items-center  w-25'>
                    <div  onClick={()=>{
                        remove(props._id)
                        }} role='button'>
                        <FontAwesomeIcon role='button'   className='text-light'  size='xl' icon={faTrash}/>
                    </div>
                </div>
                <Modal show={show} onHide={onHide} size='lg'>
                <Modal.Header closeButton><Modal.Title>Incident Report</Modal.Title></Modal.Header>
                <Modal.Body>
                    <pre>
                        {props.descriptionOfIncident}
                    </pre>
                </Modal.Body>
                <Accordion>
                 <Accordion.Item eventKey="0">
                    <Accordion.Header>Locations</Accordion.Header>
                    <Accordion.Body>
                        <ul>
                            {props.location.map(item=><li>{item}</li>)}
                        </ul>
                    </Accordion.Body>
                 </Accordion.Item>

                 <Accordion.Item eventKey="1">
                    <Accordion.Header>Motivations</Accordion.Header>
                    <Accordion.Body>
                        <ul>
                            {props.possibleMotivation.map(item=><li>{item}</li>)}
                        </ul>
                    </Accordion.Body>
                 </Accordion.Item>

                 <Accordion.Item eventKey="3">
                    <Accordion.Header>Interventions</Accordion.Header>
                    <Accordion.Body>
                        <ul>
                            {props.intervention.map(item=><li>{item}</li>)}
                        </ul>
                    </Accordion.Body>
                 </Accordion.Item>
                </Accordion>

                <Modal.Footer></Modal.Footer>
            </Modal>
        </div>
    )
}