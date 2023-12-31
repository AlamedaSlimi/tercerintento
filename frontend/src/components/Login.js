import React, { useState, useEffect} from 'react';
import axios from 'axios'
import './Login.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function Login({ setIsLogin }) {
  
  const [user, setUser] = useState({
    name: " ", email: " ", password: " "
  })

  const [err, setErr] = useState('')

  const onChangeInput = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value })
    setErr('')
  }
  //fetching register user 
  const registerSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('https://notesappla.onrender.com/user/register', {
        username: user.name,
        email: user.email,
        password: user.password
      })
      setUser({ name: " ", email: " ", password: " " })
      setErr(res.data.msg)

    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg)
    }
  }

  //login
  const loginSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('https://notesappla.onrender.com/user/login', {
        email: user.email,
        password: user.password
      })
      setUser({ name: " ", email: " ", password: " " })
      localStorage.setItem('tokenStore', res.data.token)
      setIsLogin(true)
    } catch (err) {
      err.response.data.msg && setErr(err.response.data.msg)
    }
  }

  //Visibility
  const[onLoging, setOnLogin] = useState(false)
  const style = {
    visibility: onLoging? "visible" : "hidden",
    opacity: onLoging? 1:0
  }

  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  // http://api.quotable.io/random
  
  useEffect(() => {
    fetch("https://api.quotable.io/random")
      .then(res => res.json())
      .then(
        (quote) => {
          setQuote(quote.content);  
          setAuthor(quote.author);
        }
      )
  },[]);

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

  return (

    <section className='login-page'>
      
      {/* **************Login********** */}
      <div className="login-signup">
       <div className="outer">
      <div className="inner">
        <form onSubmit={loginSubmit}>

          <h3>Iniciar sesion</h3>

          <div className="form-group">
            <label>Correo electronico</label>
            <input type="email" className="form-control" placeholder="Introduce tu email" name='email'
             required value={user.email} onChange={onChangeInput} />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input type="password" className="form-control" placeholder="Introduce tu contraseña" name='password'
             required value={user.password} onChange={onChangeInput}  />
          </div>

          <div class="d-grid gap-2">
              <button class="btn btn-primary" type="submit">Iniciar sesion</button>
            </div>
            <p className="next_page">
            ¿No tienes una cuenta? <span onClick={()=>setOnLogin(true)}>Registrate aqui</span>
            </p>
          <h4>{err}</h4>
        </form>

      </div>
    </div>


    {/* ************Register******* */}

      <div className="outer" style={style}>
        <div className="inner">
          <form onSubmit={registerSubmit}>
            <h3>Registrarse</h3>

            <div className="form-group">
              <label>Nombre</label>
              <input type="text" className="form-control"  placeholder="Introduce tu nombre:" name='name'
               required  value={user.name} onChange={onChangeInput} />
            </div>
            <div className="form-group">
              <label>Correo electronico</label>
              <input type="email" className="form-control" placeholder="Introduce tu email (e.g. Hussein@gmail):" name='email'
               value={user.email} required onChange={onChangeInput} />
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <input type="password" className="form-control" placeholder="Introduce tu contraseña:" name='password'
              value={user.password} required  onChange={onChangeInput}  />
            </div>

            <div class="d-grid gap-2">
              <button class="btn btn-primary" type="submit">Registrarse</button>
            </div>
            <p className="next_page">
            ¿Ya tienes una cuenta? <span onClick={()=>setOnLogin(false)} >Inicia sesion</span>
            </p>
            <h4 >{err}</h4>
          </form>
        </div>
      </div>
      </div>
                
      <div className="quoteApi">
        <div className="quote">
          <h2>{quote}</h2>
          <small>-{author}-</small>
        </div><br />
        <button className="btn" onClick={fetchNewQuote}>Generate New Quote</button>
      </div>
                
    </section>
  )
}

export default Login
