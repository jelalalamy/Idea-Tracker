import { useState } from 'react'

const AddIdea = ({onAdd}) => {
    const [text, setText] = useState('')
    const [desc, setDesc] = useState('')
    const [important, setImportant] = useState(false)

const onSubmit = (e) => {
    e.preventDefault()
    if(!text){
        alert('Please add an idea')
        return
    }

    onAdd({text, desc, important})
    setText('')
    setDesc('')
    setImportant(false)
}

    return (
        <form className='add-form' onSubmit={onSubmit}>
            <div className='form-control'>
                <label>Idea</label>
                <input type='text' placeholder='Add idea...' 
                value={text} onChange={(e) => setText(e.target.value)}/>
            </div>
            <div className='form-control'>
                <label>Short Description*</label>
                <input type='text' placeholder='Add description...' 
                value={desc} onChange={(e) => setDesc(e.target.value)}/>
            </div>
            <div className='form-control form-control-check'>
                <label>Mark Important*:</label>
                <input type='checkbox' checked={important}
                value={important} onChange={(e) => setImportant(e.currentTarget.checked)}/>
            </div>
            <input type='submit' value='Save Task' className = 'btn btn-block'/>
        </form>
    )
}

export default AddIdea
