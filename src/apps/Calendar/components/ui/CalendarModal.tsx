import * as Yup from 'yup';
import { useAppDispatch, useAppSelector } from '../../../../hooks';

import Modal from 'react-modal';
import { calendarActions as calendar, uiActions as ui } from '../../context';
import { useEffect, useState } from 'react';
import { addHours, differenceInSeconds, differenceInDays } from 'date-fns';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import DatePicker from 'react-datepicker';
import './CalendarModal.css';
import Swal from 'sweetalert2';

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
  title: Yup.string().required('Title is required').min(5),
  start: Yup.date().required('Start date is required'),
  end: Yup.date().required('End date is required'),
  notes: Yup.string(),
});

interface IValues {
  title: string;
  notes: string;
  start: Date | string;
  end: Date | string;
}

interface IOnSubmit {
  setSubmitting: (value: boolean) => void;
}

export const CalendarModal = () => {
  const dispatch = useAppDispatch();

  /* Get data from store */
  const { isDateModalOpen } = useAppSelector((state) => state.ui);
  const { activeEvent } = useAppSelector((state) => state.calendar);

  const [initialValues, setInitialValues] = useState<IValues>({
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

  const onSubmit = async (values: IValues, { setSubmitting }: IOnSubmit) => {
    setSubmitting(true);

    const difference = differenceInSeconds(values.end, values.start);
    const isFuture = differenceInDays(values.start, Date.now());

    if (isFuture < 0) {
      Swal.fire('Incorrect dates', 'Since date cannot in the past', 'error');
      setSubmitting(false);
      return;
    }

    if (isNaN(difference) || difference < 0) {
      Swal.fire('Incorrect dates', 'Check dates entered');
      setSubmitting(false);
      return;
    }

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
      <h3 className="text-primary-emphasis">New event</h3>
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

            <hr />
            <section className="form-group mb-2">
              <label htmlFor="start" className="form-label d-block">
                Since date/time
              </label>
              <DatePicker
                selected={values.start as Date}
                onChange={(date) => setFieldValue('start', date)}
                className="form-control"
                dateFormat="Pp"
                showTimeSelect
                wrapperClassName="datepicker"
              />
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
                selected={values.end as Date}
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
