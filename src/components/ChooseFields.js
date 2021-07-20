import React,  { useState } from "react";
import {Container, Row, Col} from 'react-bootstrap';

import Wrapper from './Wrapper';

function EachField({field, onClick}){
    return(
        <li className="field" onClick={onClick} data-id={field.id} data-name={field.fieldName} data-value={field.img} data-flag="0">
            <input type="checkbox" name={field.fieldName} value={field.img} />
            <div className="img-part"><img src={field.img} alt="Field Icons"/></div> 
            <span>{field.fieldName}</span>
        </li>
    );
}
function SelectedFields({selField}){
    return(
        <li className="field">
            <div className="img-part"><img src={selField.img} alt="Field Icons"/></div> 
            <span>{selField.fieldName}</span>    
        </li>
    );
}

function ChooseFields(){
    const colStyle1={
        padding: '10px 10px 10px 25px',
    };
    const colStyle2={
        padding: '10px 25px 10px 10px',
    };
    const rowStyle={
        minHeight: '700px'
    }

    const data = [
        {
            id: 1,
            img: 'images/A.png',
            fieldName: 'Customer First Name'
        },
        {
            id: 2,
            img: 'images/123.png',
            fieldName: 'Order Number'
        },
        {
            id: 3,
            img: 'images/A.png',
            fieldName: 'Street Address'
        }
    ];
    
    const [inputText, setInputText] = useState("");

    // search field change event
    const onChange = e =>{
        let searchText = e.target.value.toLowerCase();
        setInputText(searchText);
    };

    // selected field block
    const [selectedFields, setSelectedFields] = useState([]);

    const onClick = e => {
        const buf = e.target.closest("li");
        const id = buf.getAttribute("data-id");
        const name = buf.getAttribute("data-name");
        const value = buf.getAttribute("data-value");
        const flag = buf.getAttribute("data-flag");

        const temp = {
            id: id,
            img: value,
            fieldName: name
        };

        if(flag === "0"){
            let repeatFlag = false;
            buf.setAttribute("data-flag", "1");
            buf.children[0].checked = true;
            selectedFields.forEach(field => {
                console.log("here", field);
                if(field.id === temp.id){
                    repeatFlag = true;
                    return;
                }
            });
            if(!repeatFlag) setSelectedFields([...selectedFields, temp]);
        }else{
            buf.setAttribute("data-flag", "0");
            buf.children[0].checked = false;
            setSelectedFields(selectedFields.filter(field => field.id !== id));
        }
    };

    const [isActiveAll, setActiveAll] = useState("active");
    const [isActiveDimension, setActiveDimension] = useState("inactive");
    const [isActiveMeasure, setActiveMeasure] = useState("inactive");

    const onAllClick = e => {
        setActiveAll("active");
        setActiveDimension("inactive");
        setActiveMeasure("inactive");
    };

    const onDimensionClick = e => {
        setActiveAll("inactive");
        setActiveDimension("active");
        setActiveMeasure("inactive");
    };

    const onMeasureClick = e => {
        setActiveAll("inactive");
        setActiveDimension("inactive");
        setActiveMeasure("active");
    }

    return(
        <Wrapper>
            <Container>
                <h3>Choose fields</h3>
                <div className="main">
                    <Row style={rowStyle}>
                        <Col xs="12" md="6" className="separation-part" style={colStyle1}>
                            <div className="search-field">
                                <img src="images/search.png" alt="search" />
                                <input name="search" placeholder="Search.." onChange={onChange}/>                                
                            </div>
                            <div className="btn-field">
                                <button className={"all-btn "+ isActiveAll} onClick={onAllClick} >All Fields</button>
                                <button className={"dimension-btn "+isActiveDimension} onClick={onDimensionClick} >Dimensions</button>
                                <button className={"measure-btn "+isActiveMeasure} onClick={onMeasureClick} >Measures</button>
                            </div>
                            <div className="field-names">
                                <p>Field Names</p>
                                <ul>
                                    { 
                                        data.filter(field => field.fieldName.toLowerCase().includes(inputText)).map((field, index) => (
                                            <EachField field={field} onClick={onClick} key={index}/>
                                        ))
                                    }
                                </ul>
                            </div>
                        </Col>
                        <Col xs="12" md="6" className="selected-part" style={colStyle2}>
                            <div className="title">Selected Fields</div>
                            <ul className="selected-fields">
                                {selectedFields.map((selField, index) => (
                                    <SelectedFields selField={selField} key={index}/>
                                ))}                      
                            </ul>
                        </Col>
                    </Row>                    
                </div>
                <div className="bottom">
                    <button className="active">Done</button>
                    <button>Cancel</button>
                </div>
            </Container>
        </Wrapper>
    );
}

export default ChooseFields;