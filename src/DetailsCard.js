import React, { useState } from "react";
import { FaEdit, FaTrash } from 'react-icons/fa';
import googlemeet from './asset/google.jpg'
import "./App.css";
import Modal from "react-modal";
import moment from 'moment';
const DetailsCard = ({ event }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalPosition, setModalPosition] = useState({ right: 0, top: 0 });
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };
    const handleEdit = (event) => {
        setIsEditModalOpen(true);
        setSelectedEvent(event);
    };
    const handleDelete = () => {
        console.log('Delete clicked');
    };
    const closeEditModal = () => {
        setIsEditModalOpen(false);
        setSelectedEvent(null);
    };
    const handleDownload = (fileName) => {

    };

    const handlePreview = (fileName) => {

    };
    return (
        <div className="modalone" style={{ border: "1px solid black", padding: "10px", marginBottom: "5px" }}>
            <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                <p style={{ margin: 0, marginLeft: '30px' }}>{event.job_id.jobRequest_Title}</p>
                <FaEdit style={{ cursor: 'pointer', marginLeft: "100px", color: "#0072C6" }} onClick={handleEdit} />
                <FaTrash style={{ cursor: 'pointer', marginLeft: "2px", color: "red" }} onClick={handleDelete} />
            </div>
            <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>

                <p style={{ marginLeft: "30px", borderRight: "1px solid #B2B2B2", paddingRight: "15px" }} >{event.desc}</p>

                <p style={{ marginLeft: "10px" }}>Interviewer: {event.user_det.handled_by.firstName}</p>
            </div>
            <div style={{ display: 'flex', gap: '2px', alignItems: 'center', padding: '0px', marginBottom: "0px" }}>

                <p style={{ marginLeft: "25px", borderRight: "1px solid #B2B2B2", paddingRight: "1px" }}>Date: {moment(event.start).format('DD MMM YYYY')}
                </p>

                <p style={{ marginLeft: "10px" }}>Time: {moment(event.start).format('h A')} -  {moment(event.end).add(20, 'minutes').format('h A')}</p>
            </div>

            <Modal
                isOpen={isEditModalOpen}
                onRequestClose={closeEditModal}
                contentLabel="Edit Event"
                ariaHideApp={false}

                style={{
                    overlay: {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1000,
                    },
                    content: {
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "500px",
                        height: "400px",
                        padding: "20px",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.2)",
                        zIndex: 1001,
                        opacity: 1,
                        overflow: "hidden",
                    },
                }}
            >

                <button
                    onClick={closeEditModal}
                    style={{
                        border: "none",
                        background: "transparent",
                        fontSize: "20px",
                        cursor: "pointer",
                        padding: 0,
                        position: "absolute",
                        top: "2px",
                        right: "2px",
                        color: "#fff",
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        backgroundColor: "#0072C6",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",

                    }}
                >
                    <i className="fas fa-times" />
                </button>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "20px", border: "1px solid #B2B2B2" }}>
                    <div style={{ flex: 1, marginRight: "20px", borderRight: "1px solid #B2B2B2" }}>
                        <p>Interview with: {event.user_det.candidate.candidate_firstName}</p>
                        <p>Position: {event.job_id.jobRequest_Title}</p>
                        <p>Created By: - </p>
                        <p>Interview date: {moment(event.start).format('DD MMM YYYY')}</p>
                        <p>Interviewer Time: {moment(event.start).format('h A')} -  {moment(event.end).format('h:mm A')}</p>
                        <p>Interview Via: Google Meet</p>
                        <button
                            className="buttontest"
                            style={{ display: "flex", alignItems: "center", width: "200px", height: "50px", }}
                            onClick={() => handlePreview("Resume.docx")}
                        >
                            Resume.docx
                            <i className="fas fa-eye" style={{ marginLeft: "8px" }} />
                            <i
                                className="fas fa-download"
                                style={{ marginLeft: "8px", cursor: "pointer" }}
                                onClick={() => handleDownload("Resume.docx")}
                            />
                        </button>

                        <button
                            className="buttontest"
                            style={{ display: "flex", alignItems: "center", width: "200px", height: "50px", }}
                            onClick={() => handlePreview("Aadharcard")}
                        >
                            Aadharcard
                            <i className="fas fa-eye" style={{ marginLeft: "10px" }} />
                            <i
                                className="fas fa-download"
                                style={{ marginLeft: "8px", cursor: "pointer" }}
                                onClick={() => handleDownload("Aadharcard")}
                            />
                        </button>
                    </div>
                    <div style={{ flex: 1, gap: "20px" }}>
                        <img src={googlemeet} alt="Googlemeet" style={{ width: "80%", height: "auto", marginTop: "80px", border: "1px solid #B2beb5", padding: "10px" }} />
                        <button className='buttonjoin' style={{ marginTop: "20px" }} onClick={() => window.location.href = "https://www.example.com"}>
                            Join
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default DetailsCard
