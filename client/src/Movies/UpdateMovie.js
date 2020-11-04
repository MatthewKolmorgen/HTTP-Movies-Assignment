import React, {useState,useEffect} from 'react';
import { useHistory,useParams } from 'react-router';
import axios from 'axios';
const UpdateMovie = (movies) => {

    const history = useHistory();
    const { id } = useParams();

    const [form,setForm] = useState({
        id:Date.now(),
        title:'',
        director:'',
        metascore:'',
        stars:[]
    });
    const emptyState = {
        id:Date.now(),
        title:'',
        director:'',
        metascore:'',
        stars:[]
    }

    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then((res) => {
            console.log(res);
            setForm(res.data);
          })
          .catch((err) => console.error(err));
      }, [id]);
    
    const handleChanges = e => {
        const newFormData = {
            ...form, [e.target.name] : e.target.value
        }
        setForm(newFormData);
    }
    const handleSubmit = e => {
        e.preventDefault();
        axios
        .put(`http://localhost:5000/api/movies/${id}`, form )
        .then((res) => {
            console.log(res)
            console.log(movies)
            history.push('/');
        })
        .catch((err) => {
            console.log(form)
        })
    }
    return(
        <div>
        <h2>Update Movie!</h2>
        <p>
            {form.title}
        </p>
        <p>
            {form.director}
        </p>
        <form onSubmit = {handleSubmit}>
            <label htmlFor = 'title'>
                title:
            <input
            type = 'text' 
            name = 'title'
            placeholder = 'title'
            value = {form.title}
            onChange = {handleChanges}
             />
            </label>
            <label htmlFor = 'director'>
                director:
            <input
            type = 'text' 
            name = 'director'
            placeholder = 'director'
            value = {form.director}
            onChange = {handleChanges}
             />
            </label>
            <button>Update</button>
        </form>
        </div>
    )
}

export default UpdateMovie;