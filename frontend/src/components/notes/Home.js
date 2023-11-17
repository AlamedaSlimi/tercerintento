import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import axios from 'axios'
import './home.css'

function Home() {

    const [notes, setNotes] = useState([]);
    const [token, setToken] = useState('')

    const [quote, setQuote] = useState("");
    const [author, setAuthor] = useState("");

    const getNotes = async (token) => {
        console.log(token)
        const res = await axios.get('https://notesappla.onrender.com/api/notes', {
            headers: { Authorization: token }
        })
        console.log(res)
        setNotes(res.data)
      
    }

    useEffect(() => {
        const token = localStorage.getItem('tokenStore')
       
        setToken(token)
        if (token) {
            getNotes(token)
        }

    }, [])

let fetchNewQuote = () => {
    fetch("https://api.quotable.io/random")
      .then(res => res.json())
      .then(
        (quote) => {
          setQuote(quote.content);  
          setAuthor(quote.author);
        }
      )
  }

const deleteNote = async(id)=>{
    try {
        if(token){
            await axios.delete(`https://notesappla.onrender.com/api/notes/${id}`,{
                headers:{Authorization:token}
            })
            getNotes(token)
        }
        
    } catch (err) {
        window.location.href = '/';
    }

}



    return (
        <div className="notes-wrapper">
            {
                notes.map(note => (
                    <div className="card" key={note._id}>
                        <h4 title={note.title}>{note.title}</h4>
                        <div className="text-wrapper">
                            <p>{note.content}</p>

                        </div>
                        <p className='date'>{format(note.date)}</p>
                        <div className="card-footer">
                            {note.name}
                            <Link to={`edit/${note._id}`}> Edit</Link>
                        </div>
                        <button className='close' onClick={()=>deleteNote(note._id)} >X</button>
                    </div>
                ))
            }
        </div>
    <div className="App">
         <div className="quote">
            <h2>{quote}</h2>
            <small>-{author}-</small>
         </div><br />
         <button className="btn" onClick={fetchNewQuote}>Generate New Quote</button>
    </div>
    )
}

export default Home
