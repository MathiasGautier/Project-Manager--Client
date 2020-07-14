import React, {useState, useEffect} from 'react';
import apiHandler from '../services/apiHandler';
import NewSubTask from '../components/NewSubTask';

function OneTask(props) {
    const [task, setTask]= useState(undefined);
    const [users, setUsers]= useState(undefined);

    useEffect(()=>{
        apiHandler
        .get("/user/users")
        .then((apiRes)=>{
          setUsers(apiRes.data)
        })
        .catch((error)=>{
          console.log(error)
        })
      },[])

    useEffect(()=>{
        const id = props.match.params.id;
        apiHandler
            .getOneTodo(`${id}`)
            .then((apiRes)=>{
                setTask(apiRes)
            })
            .catch((error)=>{
                console.log(error)
            })
    },[props.match.params.id])

 
    return (
        <div>
        {
            task &&
            <>
            <h1>{task.name}</h1>
            <p>{task.description}</p>
            <p>Created by {task.creator.username}</p>
            </>
        }
           <h2>Add tasks</h2>
           <NewSubTask users={users} id={props.match.params.id} />
        </div>
    )
}

export default OneTask
