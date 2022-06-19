import { useMemo, useState, useEffect } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import Modal from 'react-modal';

import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import es from 'date-fns/locale/es';
import {
  onCleanActiveEvent,
  onCloseDateModal,
} from '../../context';
import {
  useAppDispatch,
  useAppSelector,
} from '../../hooks/redux';
import { startSavingEvent } from '../../context/calendar/calendar.action';
// import { useCalendarStore, useUiStore } from '../../hooks';

registerLocale('es', es);

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

/* Types */
type TypeInputChanged =
  | React.ChangeEvent<HTMLInputElement>
  | React.ChangeEvent<HTMLTextAreaElement>;

export const CalendarModal = () => {
  const dispatch = useAppDispatch();

  /* Get data from store */
  const { isDateModalOpen } = useAppSelector(
    (state) => state.ui
  );
  const { activeEvent } = useAppSelector(
    (state) => state.calendar
  );

  /* Local states */
  const [formSubmitted, setFormSubmitted] =
    useState<boolean>(false);

  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return '';

    return formValues.title.length > 0 ? '' : 'is-invalid';
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onInputChanged = ({ target }: TypeInputChanged) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChanged = (
    event: Date | null,
    changing: string
  ) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  const onCloseModal = () => {
    dispatch(onCloseDateModal());
    dispatch(onCleanActiveEvent());
  };

  /* Create or update an event */
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setFormSubmitted(true);

    const difference: number = differenceInSeconds(
      formValues.end,
      formValues.start
    );

    if (isNaN(difference) || difference <= 0) {
      Swal.fire(
        'Fechas incorrectas',
        'Revisar las fechas ingresadas',
        'error'
      );
      return;
    }

    if (formValues.title.length <= 0) return;

    dispatch(startSavingEvent(formValues));
    dispatch(onCloseDateModal());
    setFormSubmitted(false);
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker
            selected={formValues.start}
            onChange={(event) => onDateChanged(event, 'start')}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            onChange={(event) => onDateChanged(event, 'end')}
            className="form-control"
            dateFormat="Pp"
            showTimeSelect
            locale="es"
            timeCaption="Hora"
          />
        </div>
        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${titleClass}`}
            placeholder="Título del evento"
            autoComplete="off"
            value={formValues.title}
            name="title"
            onChange={onInputChanged}
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group mb-2">
          <textarea
            className="form-control"
            placeholder="Notas"
            rows={5}
            value={formValues.notes}
            name="notes"
            onChange={onInputChanged}
            style={{ resize: 'none' }}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
