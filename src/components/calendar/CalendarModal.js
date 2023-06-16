import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2'
import { useSelector, useDispatch } from 'react-redux'
import { uiCloseModal } from '../../actions/ui';
import { eventClearActiveEvent, eventStartAddNew, eventStartUpdate } from '../../actions/events';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours')
const nowEnd = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: nowEnd.toDate()
}

export const CalendarModal = () => {

    const dispatch = useDispatch()

    const { modalOpen } = useSelector(state => state.ui)
    const { activeEvent } = useSelector(state => state.calendar)

    const [startDate, setStartDate] = useState(now.toDate())
    const [endDate, setEndDate] = useState(nowEnd.toDate())
    const [validTitle, setValidTitle] = useState(true)

    const [formValues, setFormValues] = useState(initEvent)

    const { notes, title, start, end } = formValues

    useEffect(() => {
        if (activeEvent) {
            setFormValues(activeEvent)
        } else{
            setFormValues( initEvent )
        }
    }, [activeEvent, setFormValues])


    const handleInputChange = ({ target }) => {

        setFormValues({
            ...formValues,
            [target.name]: target.value
        })
    }

    const closeModal = () => {
        dispatch(uiCloseModal())
        dispatch(eventClearActiveEvent())
        setFormValues(initEvent)
    }

    const handleStartDateChange = (e) => {
        setStartDate(e);
        setFormValues({
            ...formValues,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setEndDate(e);
        setFormValues({
            ...formValues,
            end: e
        })
    }

    const hsndleSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment(start)
        const momentEnd = moment(end)

        if (momentStart.isSameOrAfter(momentEnd)) {
            return Swal.fire('Error', 'The final date most be higher than the start date', 'error')
        }

        if (title.trim().length < 2) {
            return setValidTitle(false)
        }

        if (activeEvent) {
            dispatch(eventStartUpdate(formValues))
        } else {
            dispatch(eventStartAddNew( formValues ))
        }



        setValidTitle(true)
        closeModal()
    }

    return (
        <Modal
            isOpen={modalOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            closeTimeoutMS={200}
            className='modal'
            overlayClassName='modal-fondo'
        >
            <h1> { activeEvent ? 'Edit event' : 'New event'} </h1>
            <hr />
            <form className="container" onSubmit={hsndleSubmitForm}>

                <div className="form-group mb-2">
                    <label>Starting Date and Time</label>
                    <DateTimePicker className='form-control' onChange={handleStartDateChange} value={startDate} />
                </div>

                <div className="form-group mb-2">
                    <label>Ending Date and Time</label>
                    <DateTimePicker className='form-control' onChange={handleEndDateChange} value={endDate} minDate={startDate} />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Title and Notes</label>
                    <input
                        type="text"
                        className={`form-control ${!validTitle && 'is-invalid'}`}
                        placeholder="Event Title"
                        name="title"
                        autoComplete="off"
                        value={title}
                        onChange={handleInputChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">Short Description</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notes"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={handleInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Aditional information</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Save</span>
                </button>

            </form>
        </Modal>
    )
}
