import React, { useState } from "react";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import "./App.css";
import moment from 'moment';
import ModalCard from "./ModalCard";
const DetailsCard = ({ event, isflag }) => {
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(isflag);
    const handleEdit = (event) => {
        console.log(selectedEvent);
        setIsEditModalOpen(true);
        setSelectedEvent(event);
    };
    const handleDelete = () => {
        console.log('Delete clicked');
    };
    return (
        <div className="modalone" style={{ border: "none", height: "80px", borderBottom: "1px solid rgb(244, 227, 227)", padding: "10px", marginBottom: "5px" }}>
            <div style={{ display: 'flex', gap: '0px', alignItems: 'center' }}>
                <p style={{ margin: 0, marginLeft: '27px' }}>{event.job_id.jobRequest_Title}</p>
                <BiEditAlt style={{ cursor: 'pointer', marginLeft: "100px", color: "black" }} />
                <MdDeleteOutline style={{ cursor: 'pointer', marginLeft: "2px", color: "red" }} onClick={handleDelete} />
            </div>
            <div style={{ display: 'flex', gap: '0px', alignItems: 'center', marginTop: "5px", height: "30px" }}>
                <p style={{ marginLeft: "27px", borderRight: "1px solid #B2B2B2", paddingRight: "15px" }} >{event.desc}</p>
                <p style={{ marginLeft: "10px" }}>Interviewer: {event.user_det.handled_by.firstName}</p>
            </div>
            <div onClick={handleEdit} style={{ display: 'flex', gap: '0px', alignItems: 'center', padding: '0px', marginBottom: "0px", height: "30px" }}>
                <p style={{ marginLeft: "27px", borderRight: "1px solid #B2B2B2", paddingRight: "1px" }}>Date: {moment(event.start).format('DD MMM YYYY')}
                </p>
                <p style={{ marginLeft: "10px" }}>Time: {moment(event.start).format('h A')} -  {moment(event.end).add(20, 'minutes').format('h A')}</p>
            </div>
            <ModalCard event={event} isEdit={isEditModalOpen} setedit={setIsEditModalOpen} />
        </div>
    );
};

export default DetailsCard
