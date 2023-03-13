import React, { useState, useEffect } from "react";
import "./poll.css";

function Poll(props) {
    const [pollOptions,setPollOptions] = useState();
    const [question,setQuestion] = useState(props.question);
    const [answers,setAnswers] = useState(props.answers);
    const [totalVotes, setTotalVotes] = useState(0);
    const [voted, setVoted] = useState(false);
    const url = "http://localhost:3001/polls/"+props.pollId+"/vote";
    const submitVote = (e) => {
        if(voted === false) {
            const voteSelected = e.target.dataset.id;
            const body={"answer":voteSelected};
            console.log(body);
            // const voteCurrent = pollOptions[voteSelected].votes;
            // pollOptions[voteSelected].votes = voteCurrent + 1;
            setTotalVotes(totalVotes + 1);
            setVoted(!voted);
            const options = {
                method: "POST",
                body: JSON.stringify(body),
                headers: { "Content-Type": "application/json" },
            };
            fetch(url, options)
                .then((res) => res.json())
                .then((res) => console.log(res));
        }
    };

    useEffect(()=>{
        let pollOpts,totalvotes=0;
        if (answers) {
            pollOpts = answers.map((ans) => {
                totalvotes+=ans.votes;
                return (
                    <li key={ans._id}>
                        <button onClick={submitVote} data-id={ans.value}>
                            {ans.value}
                            <span> {ans.votes} Votes</span>
                        </button>
                    </li>
                );
            });
        }
        setPollOptions(pollOpts);
        setTotalVotes(totalvotes);
    },[]);

    return (
        <div className="poll">
            <h1>{question}</h1>
            <ul className={voted ? "results" : "options"}>
                {pollOptions}
            </ul>
            <p>Total Votes: {totalVotes}</p>
        </div>
    );
}
export default Poll;