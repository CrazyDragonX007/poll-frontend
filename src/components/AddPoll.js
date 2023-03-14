import React, {useState} from "react";
import Bars from "react-bars";
import './bar.css';
import {CloseButton, Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import './addPoll.css'
import {FormEventHandler} from "react";

function AddPoll() {
    const data = [{"label": "Add a new poll", "barBackgroundColor": "#0d0d0c", "value": "100"}]
    const [answerCount,setAnswerCount] = useState(1);
    const [title,setTitle] = useState('');
    const [question,setQuestion] = useState('');
    const [answers,setAnswers] = useState([]);

    const onAnswerChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        let ans = answers;
        for(let i=0;i<ans.length;i++){
            const t=ans[i];
            if(t.name===name){
                t.value = value;
                ans[i]=t;
                setAnswers(ans);
                return;
            }
        }
        const temp = {"name":name,"value":value,votes:0}
        ans.push(temp);
        setAnswers(ans);
    };

    const [answerFields,setAnswerFields] = useState([(<Form.Group name="ans1" className="mb-3" controlId="formBasicAnswer">
        <Form.Label>Enter an answer choice for the poll</Form.Label>
        <Form.Control type="text" name="ans1" onChange={onAnswerChange} placeholder="Enter an answer choice for the poll" className="bg text"/>
    </Form.Group>)]);

    const close = (e) => {
        const name = e.target.name;
        console.log(name);
        console.log(answerFields);
        let newAnswers=answerFields.slice().filter(t=>t.props.name!==name);
        let ans=answers.slice().filter(t=>t.name!==name);
        setAnswerFields(newAnswers);
        setAnswers(ans);
    }

    const addOption = () => {
        const ansCount = answerCount+1;
        const name="ans"+ansCount;
        const ans=(<Form.Group name={name} className="mb-3" controlId="formBasicAnswer">
                    <Form.Label>Enter an answer choice for the poll</Form.Label>
            <div className="close1">
                <Form.Control name={name} onChange={onAnswerChange} type="text" placeholder="Enter an answer choice for the poll" className="bg text"/>
                {/*<CloseButton name={name} onClick={close} className="close" variant="white" />*/}
            </div>
                </Form.Group>);
        let newAnswers = answerFields;
        newAnswers.push(ans);
        setAnswerFields(newAnswers);
        setAnswerCount(ansCount);
    }

    const onTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
    }

    const onQuestionChange = (e)=>{
        const value = e.target.value;
        setQuestion(value);
    }

    const submitHandler: FormEventHandler = (event) => {
        event.preventDefault();
        event.persist();
        let body = {};
        body.title = title;
        body.question = question;
        const tanswers=answers;
        const key="name";
        for(let i=0;i<tanswers.length;i++){
            const ans=tanswers[i];
            delete ans[key];
        }
        body.answers = tanswers;
        const url="http://localhost:3001/polls";
        const options = {
            method: "POST",
            body: JSON.stringify(body),
            headers: { "Content-Type": "application/json" },
        };
        fetch(url, options).then((res) => res.json()).then((res) => window.location.reload());
    };

    return (
        <>
            <br/>
            <Bars data={data} className="bar-label"/>
            <Form onSubmit={submitHandler} className="form text">
                <Form.Group className="mb-3" controlId="formBasicTitle">
                    <Form.Label>Enter the title of the poll</Form.Label>
                    <Form.Control onChange={onTitleChange} name="title" type="text" placeholder="Enter title" className="bg text"/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicQuestion">
                    <Form.Label>Enter the poll topic or question</Form.Label>
                    <Form.Control onChange={onQuestionChange} name="question" className="bg text" type="text" placeholder="Enter the poll topic or question"/>
                </Form.Group>
                {answerFields.map(ans=>ans)}
                <Button onClick={addOption} className="button1" variant="dark">
                    Add an option
                </Button>
                <br/>
                <Button className="button1" variant="dark" type="submit">
                    Submit
                </Button>
            </Form>
            <br/>
        </>
    );
}

export default AddPoll;