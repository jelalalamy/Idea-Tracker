import { FaTimes } from 'react-icons/fa'

const Idea = ({ idea, onDelete, onToggle }) => {
    return (
        <div className={`idea ${idea.important ? 'important' : ''}`} onDoubleClick={() => onToggle(idea.id)}>
            <h3>     
                {idea.text} 
                <FaTimes className="x" style={{color:'red', cursor:'pointer'}} 
                onClick={() => onDelete(idea.id)}/>
            </h3>
            <p>{idea.desc}</p>
        </div>
    )
}

export default Idea
