import React from "react";
import googlemeet from './asset/google.jpg'
import Modal from "react-modal";
import moment from 'moment';
import { IoEyeSharp } from "react-icons/io5";
import { LuDownload } from "react-icons/lu";
const ModalCard = ({ event, isEdit, setedit }) => {
    const closeEditModal = () => {
        setedit(false);
    };
    return (
        <div>
            <Modal
                isOpen={isEdit}
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
                        width: "550px",
                        height: "405px",
                        padding: "20px",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 18px rgba(248, 226, 226, 0.2)",
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
                            style={{
                                borderRadius: "5px",
                                display: "flex",
                                alignItems: "center",
                                width: "220px",
                                height: "50px",
                                gap: "10px",
                                justifyContent: "space-between"
                            }}
                        >
                            <span style={{ marginLeft: "0", fontSize: "20px" }} >Resume.docx</span>
                            <div style={{ borderRadius: "5px", display: "flex" }}>
                                <IoEyeSharp style={{ marginLeft: "0px", fontSize: "30px" }} />
                                <LuDownload style={{ marginLeft: "0px", fontSize: "30px" }} />
                            </div>
                        </button>
                        <button
                            className="buttontest"
                            style={{
                                borderRadius: "5px",
                                display: "flex",
                                alignItems: "center",
                                width: "220px",
                                height: "50px",
                                gap: "10px",
                                justifyContent: "space-between"
                            }}
                        >
                            <span style={{ marginLeft: "0", fontSize: "20px" }} >Aadharcard</span>

                            <div style={{ borderRadius: "5px", display: "flex" }}>
                                <IoEyeSharp style={{ marginLeft: "0px", fontSize: "30px" }} />
                                <LuDownload style={{ marginLeft: "0px", fontSize: "30px" }} />
                            </div>
                        </button>
                    </div>
                    <div style={{ flex: 1, gap: "20px", alignItems: "center", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <img src={googlemeet} alt="Googlemeet" style={{ borderRadius: "5px", width: "60%", height: "auto", marginTop: "30px", border: "1px solid #B2beb5", padding: "10px" }} />
                        <button className='buttonjoin' style={{ borderRadius: "5px", marginTop: "2px" }} onClick={() => window.location.href = event.link}>
                            JOIN
                        </button>
                    </div>

                </div>
            </Modal>
        </div>
    )
}

export default ModalCard
