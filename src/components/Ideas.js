import Idea from './Idea'

const Ideas = ({ ideas, onDelete, onToggle }) => {
    return (
        <>
            {ideas.map((idea) => (
                <Idea key={idea.id} idea={idea} onDelete={onDelete} onToggle={onToggle}/>
            ))}
        </>
    )
}

export default Ideas
