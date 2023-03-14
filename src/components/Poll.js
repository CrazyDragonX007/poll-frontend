import React, { useState, useEffect } from "react";
import "./poll.css";
import {socket} from "../socket";

function Poll(props) {
    const [pollOptions,setPollOptions] = useState();
    const [answers, setAnswers] = useState(props.answers);
    const [totalVotes, setTotalVotes] = useState(0);
    const [voted, setVoted] = useState(false);
    const url = "http://localhost:3001/polls/"+props.pollId+"/vote";

    const submitVote = (e) => {
        if(voted === false) {
            const voteSelected = e.target.dataset.id;
            const body={"answer":voteSelected};
            let ans=answers.slice();
            for(let i=0;i<ans.length;i++){
                let t=ans[i];
                if(voteSelected===t.value){
                    t.votes+=1;
                    ans[i]=t;
                }
            }
            setAnswers(ans);
            setTotalVotes(totalVotes + 1);
            setVoted(true);
            const options = {
                method: "POST",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
            };
            socket.emit('vote',{
                pollId:props.pollId,
                socketId:socket.id,
                answer:voteSelected
            });
            fetch(url, options).then((res) => res.json()).then((res) => console.log(res));
        }
    };

    useEffect(()=>{
        let pollOpts,totalvotes=0;
        if (answers) {
            pollOpts = answers.map((ans) => {
                totalvotes+=ans.votes;
                return (
                    <li key={ans._id}>
                        <button onClick={submitVote} disabled={voted} data-id={ans.value}>
                            {ans.value}
                            <span> - {ans.votes} Votes</span>
                        </button>
                    </li>
                );
            });
        }
        setPollOptions(pollOpts);
        setTotalVotes(totalvotes);
        // eslint-disable-next-line
    },[voted,answers]);

    return (
        <div className="poll">
            <h1 className="text">{props.title}</h1>
            <h2 className="text">{props.question}</h2>
            <ul className={voted ? "results" : "options"}>
                {pollOptions}
            </ul>
            <p className="text">{voted?<span>Thank you for voting! </span>:null}Total Votes: {totalVotes}</p>
        </div>
    );
}
export default Poll;