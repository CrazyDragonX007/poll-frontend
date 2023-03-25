import React, {useState} from "react";
import Bars from "react-bars";
import './bar.css';
import {Form} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import './addPoll.css'
import {FormEventHandler} from "react";

function AddPoll() {
    const data = [{"label": "Add a new poll", "barBackgroundColor": "#0d0d0c", "value": "100"}]
    const [answerCount,setAnswerCount] = useState(2);
    const [title,setTitle] = useState('');
    const [question,setQuestion] = useState('');
    const [answers,setAnswers] = useState([]);
    const [removeDisabled,setRemoveDisabled] = useState(true);

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

    const [answerFields,setAnswerFields] = useState([(<Form.Group name="ans1" key="ans1" className="mb-3" controlId="formBasicAnswer">
        <Form.Label>Enter an answer choice for the poll</Form.Label>
        <Form.Control type="text" name="ans1" onChange={onAnswerChange} placeholder="Enter an answer choice for the poll" className="bg text" required/>
    </Form.Group>),(<Form.Group name="ans2" key="ans2" className="mb-3" controlId="formBasicAnswer">
        <Form.Label>Enter an answer choice for the poll</Form.Label>
        <Form.Control type="text" name="ans2" onChange={onAnswerChange} placeholder="Enter an answer choice for the poll" className="bg text" required/>
    </Form.Group>)]);

    const addOption = () => {
        const ansCount = answerCount+1;
        const name="ans"+ansCount;
        const ans=(<Form.Group name={name} key={name} className="mb-3" controlId="formBasicAnswer">
                    <Form.Label>Enter an answer choice for the poll</Form.Label>
                <Form.Control name={name} onChange={onAnswerChange} type="text" placeholder="Enter an answer choice for the poll" className="bg text"/>
                </Form.Group>);
        let newAnswers = answerFields.slice();
        newAnswers.push(ans);
        setAnswerFields(newAnswers);
        setAnswerCount(ansCount);
        setRemoveDisabled(false);
    }

    const removeLastOption = () => {
        const ansCount = answerCount-1;
        if(ansCount < 3){
            setRemoveDisabled(true);
        }
        let ans=answers.slice();
        let newAnswers = answerFields.slice();
        newAnswers.pop();
        ans.pop();
        setAnswerFields(newAnswers);
        setAnswerCount(ansCount);
        setAnswers(ans);
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
        const tempAnswers=answers;
        const key="name";
        for(let i=0;i<tempAnswers.length;i++){
            const ans=tempAnswers[i];
            delete ans[key];
        }
        body.answers = tempAnswers;
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
                    <Form.Control onChange={onTitleChange} name="title" type="text" placeholder="Enter title" className="bg text" required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicQuestion">
                    <Form.Label>Enter the poll topic or question</Form.Label>
                    <Form.Control onChange={onQuestionChange} name="question" className="bg text" type="text" placeholder="Enter the poll topic or question" required/>
                </Form.Group>
                {answerFields}
                <Button onClick={addOption} className="button1" variant="dark">
                    Add an option
                </Button>
                <Button onClick={removeLastOption} className="button1" disabled={removeDisabled} variant="dark">
                    Remove last option
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