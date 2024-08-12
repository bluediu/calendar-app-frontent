import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

import Modal from 'react-modal';
import { calendarActions as calendar, uiActions as ui } from '../../context';
import { useEffect, useState } from 'react';
import { addHours } from 'date-fns';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import DatePicker from 'react-datepicker';
import './CalendarModal.css';

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

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  start: Yup.date().required('Start date is required'),
  end: Yup.date().required('End date is required'),
  notes: Yup.string(),
});

export const CalendarModal = () => {
  const dispatch = useAppDispatch();

  /* Get data from store */
  const { isDateModalOpen } = useAppSelector((state) => state.ui);
  const { activeEvent } = useAppSelector((state) => state.calendar);

  const [initialValues, setInitialValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  useEffect(() => {
    if (activeEvent !== null) setInitialValues({ ...activeEvent });
  }, [activeEvent]);

  const onCloseModal = () => {
    dispatch(ui.onCloseDateModal());
    dispatch(calendar.onCleanActiveEvent());
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    console.log(values);

    setSubmitting(false);
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      ariaHideApp={false}
      overlayClassName="modal-bg"
      closeTimeoutMS={200}
    >
      <h3>New event</h3>
      <hr />
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, isSubmitting, setFieldValue }) => (
          <Form className="container">
            <section className="form-group mb-2">
              <label>Title and description</label>
              <Field
                type="text"
                className={`form-control`}
                placeholder=""
                autoComplete="off"
                name="title"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-danger"
              />
            </section>

            <section className="form-group mb-2">
              <Field
                as="textarea"
                className="form-control"
                rows={5}
                name="notes"
                style={{ resize: 'none' }}
              />
              <small id="emailHelp" className="form-text text-muted">
                Additional information
              </small>
            </section>

            <section className="form-group mb-2">
              <label htmlFor="start" className="form-label d-block">
                Since date/time
              </label>
              <div className="customDatePickerWidth">
                <DatePicker
                  selected={values.start}
                  onChange={(date) => setFieldValue('start', date)}
                  className="form-control"
                  dateFormat="Pp"
                  showTimeSelect
                />
              </div>
              <ErrorMessage
                name="start"
                component="div"
                className="text-danger"
              />
            </section>
            <section className="form-group mb-2">
              <label htmlFor="end" className="form-label d-block">
                Until date/time
              </label>
              <DatePicker
                selected={values.end}
                onChange={(date) => setFieldValue('end', date)}
                className="form-control"
                dateFormat="Pp"
                showTimeSelect
                wrapperClassName="datepicker"
              />
              <ErrorMessage
                name="end"
                component="div"
                className="text-danger"
              />
            </section>

            <div className="d-grid gap-2">
              <button
                type="submit"
                className="btn btn-secondary mt-3"
                disabled={isSubmitting}
              >
                <i className="far fa-save"></i>
                <span> Save</span>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
