import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";
import testjson from "./calendarfromtoenddate.json";
import Modal from "react-modal";
import moment from 'moment';
import DetailsCard from "./DetailsCard";
import ModalCard from "./ModalCard";
const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});
function getToDate(date) {
    return `${(date.getMonth() + 1).toString().padStart(2, "0")}/${date
        .getDate()
        .toString()
        .padStart(2, "0")}/${date.getFullYear()}`;
}
const filteredJson = testjson.reduce((acc, el) => {
    const date = getToDate(new Date(el.start));
    if (acc[date]) {
        acc[date].push(el);
    } else {
        acc[date] = [el];
    }
    return acc;
}, {});
const res = [];
for (const property in filteredJson) {
    const event = filteredJson[property];
    const obj = {
        title: event[0].job_id.jobRequest_Title,
        start: new Date(event[0].start),
        end: new Date(event[0].end),
        interViewer: event[0].user_det.handled_by.firstName,
        data: event,
    };
    res.push(obj);
}
function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalPosition, setModalPosition] = useState({ right: 0, top: 0 });
    const [currentView, setCurrentView] = useState("day");
    const [isflag, setIsFlag] = useState(false);
    const [isedit, setIsEdit] = useState(false);
    // Function to merge events with the same start and end times and count meetings
    const CustomToolbar = ({ onNavigate, label, onView }) => {
        return (
            <div style={{ display: "flex", justifyContent: "space-between", padding: "5px", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <button className="buttonarrow" onClick={() => onNavigate("PREV")}>{"<"}</button>
                    <button className="buttonarrow" onClick={() => onNavigate("NEXT")}>{">"}</button>
                    <span style={{ display: "flex", flexGrow: 1, textAlign: "center", fontSize: "20px", color: "#0072C6", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", padding: "8px" }}>25</span>
                    <span style={{ display: "flex", flexGrow: 1, textAlign: "center", paddingLeft: "500px", fontSize: "30px" }}>{label}</span>
                </div>
                <div className='rbc-btn-group'>
                    <button
                        onClick={() => { onView("day"); setCurrentView("day"); }}
                        style={{
                            fontWeight: currentView === "day" ? "bold" : "normal",
                            textDecorationLine: currentView === "day" && "underline",
                            textDecorationColor: currentView === "day" && "#0072C6",
                            textUnderlineOffset: currentView === "day" && "5px",
                            textDecorationThickness: currentView === "day" && "3px",
                            backgroundColor: "white",
                            borderStyle: "none",
                            boxShadow: "none",
                            color: "black",
                            cursor: "pointer"
                        }}
                    >
                        Day
                    </button>
                    <button
                        onClick={() => { onView("week"); setCurrentView("week"); }}
                        style={{
                            fontWeight: currentView === "week" ? "bold" : "normal",
                            textDecorationLine: currentView === "week" && "underline",
                            textDecorationColor: currentView === "week" && "#0072C6",
                            textUnderlineOffset: currentView === "week" && "5px",
                            textDecorationThickness: currentView === "week" && "3px",
                            backgroundColor: "white",
                            borderStyle: "none",
                            boxShadow: "none",
                            color: "black",
                            cursor: "pointer"
                        }}
                    >
                        Week
                    </button>
                    <button
                        onClick={() => { onView("month"); setCurrentView("month"); }}
                        style={{
                            fontWeight: currentView === "month" ? "bold" : "normal",
                            textDecorationLine: currentView === "month" && "underline",
                            textDecorationColor: currentView === "month" && "#0072C6",
                            textUnderlineOffset: currentView === "month" && "5px",
                            textDecorationThickness: currentView === "month" && "3px",
                            backgroundColor: "white",
                            borderStyle: "none",
                            boxShadow: "none",
                            color: "black",
                            cursor: "pointer"
                        }}
                    >
                        Month
                    </button>
                    <button
                        onClick={() => { onView("year"); setCurrentView("year"); }}
                        style={{
                            fontWeight: currentView === "year" ? "bold" : "normal",
                            textDecorationLine: currentView === "year" && "underline",
                            textDecorationColor: currentView === "year" && "#0072C6",
                            textUnderlineOffset: currentView === "year" && "5px",
                            textDecorationThickness: currentView === "year" && "3px",
                            backgroundColor: "white",
                            borderStyle: "none",
                            boxShadow: "none",
                            color: "black",
                            cursor: "pointer"
                        }}
                    >
                        Year
                    </button>
                </div>
            </div>
        );
    };
    const handleSelectEvent = (event) => {
        console.log("handlese");
        if (event.data.length > 1) {
            setSelectedEvent(event);
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            setModalPosition({ right: mouseX, top: mouseY + 10 });
            setIsModalOpen(true);
            setIsFlag(false);
        }
        else {
            setSelectedEvent(event);
            setIsModalOpen(false);
            setIsFlag(true);
            console.log("test");
            console.log(selectedEvent);
            console.log(isflag)
            console.log("test 1");
        }
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };
    return (
        <div className="App">
            <Calendar
                localizer={localizer}
                events={res}
                startAccessor="start"
                endAccessor="end"
                dayLayoutAlgorithm="overlap"
                eventPropGetter={(event) => ({
                    style: {
                        color: "black",
                        borderRadius: "4px",
                        width: "85%",
                        whiteSpace: "pre-line",
                        marginTop: "62px",
                        padding: "0px",

                    },
                })}
                defaultView={currentView}
                formats={{
                    dayFormat: (date) => {
                        const day = format(date, "dd MMM");
                        const weekday = format(date, "eeee");
                        return `${day} \n ${weekday}`;
                    },
                    weekdayFormat: "eeee",
                }}
                components={{
                    toolbar: (props) => <CustomToolbar {...props} views={['day', 'week', 'month']} />,
                    month: {
                        event: (props) => <Tile {...props} selectedEvent={selectedEvent} setIsEdit={setIsEdit} />,

                    },
                }}
                onSelectEvent={handleSelectEvent}
            />
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Event Details"
                ariaHideApp={false}
                className="firstmodal"
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
                        right: `${modalPosition.right}px`,
                        top: "300px",
                        width: "20%",
                        height: "300px",
                        transform: "translate(137%, -20%)",
                        padding: "10px",
                        backgroundColor: "white",
                        borderRadius: "10px",
                        boxShadow: "0px 4px 18px rgba(0, 0, 0, 0.2)",
                        zIndex: 1001,
                        opacity: 1,
                        overflow: "auto",
                        overflowY: 'auto',
                    },
                }}
            >
                <div style={{ display: 'flex', paddingBottom: "5px", justifyContent: 'space-between', alignItems: 'center', position: 'relative', borderBottom: "1px solid rgb(244, 227, 227)" }}>
                    <p style={{ margin: 0, color: "black", padding: "0px 2px" }}>Meetings</p>
                    <button
                        onClick={closeModal}
                        style={{
                            border: "none",
                            background: "transparent",
                            fontSize: "20px",
                            cursor: "pointer",
                            padding: 0,
                            position: "absolute",
                            top: "0px",
                            bottom: "2px",
                            right: "2px",
                            color: "#fff",
                            width: "25px",
                            height: "25px",
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
                </div>
                {selectedEvent && (
                    <div>
                        <div>
                            {selectedEvent.data.map((event, idx) => (
                                <DetailsCard key={idx} event={event} isflag={isflag} />
                            ))}
                        </div>
                    </div>
                )}
            </Modal>
            {selectedEvent && selectedEvent.data.length === 1 && (
                <ModalCard event={selectedEvent.data[0]} isEdit={isedit} setedit={setIsEdit} />
            )}
        </div>
    );
}
const Tile = ({ event, setIsEdit }) => {
    console.log(event);
    const handleTile = (e) => {
        setIsEdit(true);
    }
    return (
        <>
            <div className="custom-comp" onClick={handleTile} style={{
                position: "relative", fontWeight: "normal"
            }}>
                <p style={{ margin: "5px" }}>{event.title}</p>
                <p style={{ margin: "5px" }}>Interviewer: {event.interViewer}</p>
                <p style={{ margin: "5px" }}>Time: {moment(event.start).format('h A')} -  {moment(event.end).add(20, 'minutes').format('h A')}</p>
                <div
                    style={{
                        position: "absolute",
                        top: -5,
                        right: 0,
                        color: "black",
                        border: "5px solid #ffdf00",
                        borderRadius: "50%",
                        background: "#ffdf00",
                        width: "20px",
                        height: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {event.data.length}
                </div>
            </div>

        </>
    );
};

export default App;
