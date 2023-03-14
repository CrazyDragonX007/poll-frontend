import React, { useState, useEffect } from "react";
import Poll from "./Poll";
import Button from "react-bootstrap/Button";
import './poll.css';
import {socket} from "../socket";
function Polls(props){
    const url = "http://localhost:3001/polls";
    const [toShow,setToShow] = useState(false);
    const [polls, setPolls] = useState([]);
    const [currentPoll,setCurrentPoll] = useState();

    useEffect(() => {
        fetch(url).then((response) => response.json()).then(data=>setPolls(data.polls))
    }, []);

    useEffect(() => {
        socket.on('voteUpdate', (data) => {
            let newPolls=polls.slice();
            console.log(newPolls);
            for(let i=0;i<newPolls.length;i++){
                let poll=newPolls[i];
                if(data.pollId===poll._id){
                    let answers=poll.answers;
                    for(let j=0;j<answers.length;j++){
                        if(answers[j].value===data.answer){
                            console.log(answers);
                            answers[j].votes+=1;
                        }
                    }
                    poll.answers=answers;
                    newPolls[i]=poll;
                    console.log(currentPoll,data);
                    if(currentPoll?.props?.pollId===data.pollId){
                        const key=Math.random()*10;
                        const t = <Poll socket={props.socket} key={key} title={poll.title} pollId={poll._id} question={poll.question} answers={poll.answers}/>
                        setCurrentPoll(t);
                    }
                }
            }
            console.log(newPolls);
            setPolls(newPolls);
        });
        return () => socket.off('voteUpdate');
    },);

    const openPoll = (id)=>{
        for(let i=0;i<polls.length;i++){
            const poll=polls[i];
            if(poll._id===id){
                const temp=<Poll socket={props.socket} key={poll._id} title={poll.title} pollId={poll._id} question={poll.question} answers={poll.answers}/>
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