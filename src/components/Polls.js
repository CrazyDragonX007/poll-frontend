import React, { useState, useEffect } from "react";
import Poll from "./Poll";
function Polls(){
    const url = "http://localhost:3001/polls";
    const [polls, setPolls] = useState([]);
    useEffect(() => {
        fetch(url).then((response) => response.json()).then(data=>setPolls(data.polls))
    }, []);
    const listPolls = polls.map(poll=>{
        return <Poll key={poll._id} pollId={poll._id} question={poll.question} answers={poll.answers}/>
    })
    return (
        <div>{listPolls}</div>
    )
}

export default Polls;