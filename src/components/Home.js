import React, {useState} from "react";
import Polls from "./Polls";
import Bars from "react-bars";
import './bar.css';
import Button from "react-bootstrap/Button";
import AddPoll from "./AddPoll";
import './poll.css';

function Home(props){
    const data=[{"label":"List of available polls","barBackgroundColor":"#0d0d0c","value":"100"}]
    const [toggle,setToggle] = useState(false);
    const newPoll = () => setToggle(true);

    return (<>
        <br/>
        {toggle?null:<Bars data={data} className="bar-label"/>}
        {toggle?<AddPoll/>:<Polls/>}
        {toggle?<Button variant="dark" className="back" onClick={() => setToggle(false)}>Back</Button>:<Button onClick={newPoll} variant="dark">Add new poll</Button>}
    </>);
}

export default Home;