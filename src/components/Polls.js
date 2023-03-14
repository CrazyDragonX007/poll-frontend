import React, { useState, useEffect } from "react";
import Poll from "./Poll";
import Button from "react-bootstrap/Button";
import './poll.css';
function Polls(){
    const url = "http://localhost:3001/polls";
    const [toShow,setToShow] = useState(false);
    const [polls, setPolls] = useState([]);
    const [currentPoll,setCurrentPoll] = useState();

    useEffect(() => {
        fetch(url).then((response) => response.json()).then(data=>setPolls(data.polls))
    }, []);

    const openPoll = (id)=>{
        for(let i=0;i<polls.length;i++){
            const poll=polls[i];
            if(poll._id===id){
                const temp=<Poll key={poll._id} title={poll.title} pollId={poll._id} question={poll.question} answers={poll.answers}/>
                setCurrentPoll(temp);
                setToShow(true);
            }
        }
    }

    const listPolls = polls.map(poll=>{
        return <Button key={poll._id} onClick={()=>openPoll(poll._id)} variant="outline-info" className="button">{poll.title}</Button>
    });

    return (
        <>
        <div>{toShow?currentPoll:listPolls}</div>
        <div>{toShow?<Button className="back" onClick={() => setToShow(false)} variant="dark">Back</Button>:null}</div>
        </>
    )
}

export default Polls;