import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

export const Name = ({name,id,onDelete,grade,...props})=>{
    return(
        <div className="bg-white border border-dark rounded text-dark p-1">{name}-{grade}<FontAwesomeIcon onClick={()=>{
            onDelete(id)
        }}size="sm" role="button" icon={faTrash}/></div>
    )
}