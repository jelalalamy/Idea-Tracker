import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Ideas from './components/Ideas'
import AddIdea from './components/AddIdea'
import About from './components/About'


const App = () => {
  const [showAddIdea, setShowAddIdea] = useState(false)
  const [ideas, setIdeas] = useState([])

  useEffect(() => {
    const getIdeas = async () => {
      const ideasFromServer = await fetchIdeas()
      setIdeas(ideasFromServer)
    }
    getIdeas()
  }, [])

  // FETCH TASKS
  const fetchIdeas = async () => {
    const res = await fetch('http://localhost:5000/ideas')
    const data = await res.json()
    return data
  }

  // FETCH SINGLE TASK
  const fetchIdea = async (id) => {
    const res = await fetch(`http://localhost:5000/ideas/${id}`)
    const data = await res.json()
    return data
  }

  // ADD TASK
  const addIdea = async (idea) => {
    const res = await fetch('http://localhost:5000/ideas', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(idea)
    })

    const data = await res.json();

    setIdeas([...ideas, data])

  }

  // DELETE TASK
  const deleteIdea = async (id) => {
    await fetch(`http://localhost:5000/ideas/${id}`, {
      method: 'DELETE'
    })
    setIdeas(ideas.filter((idea) => idea.id !== id))
  }

  // TOGGLE REMINDER
  const toggleReminder = async (id) => {
    const ideaToToggle = await fetchIdea(id)
    const updIdea = { ...ideaToToggle, important: !ideaToToggle.important }

    const res = await fetch(`http://localhost:5000/ideas/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(updIdea)
    })

    const data = await res.json()

    setIdeas(ideas.map((idea) => idea.id === id ? { ...idea, important: data.important } : idea))
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddIdea(!showAddIdea)} showAdd={showAddIdea} />
        <Route path='/' exact render={(props) => (
          <>
            {showAddIdea && <AddIdea onAdd={addIdea} />}
            {ideas.length > 0 ? <Ideas ideas={ideas} onDelete={deleteIdea} onToggle={toggleReminder} /> : 'No Ideas to Show'}
          </>
        )}/>
        <Route path='/about' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
