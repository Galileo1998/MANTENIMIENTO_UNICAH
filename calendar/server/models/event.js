import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const eventSchema = mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId(),
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  title: {
    type: String,
    required: true,
    validate: [textValidate, 'Título inválido'],
    maxlength: [100, 'El título debe tener menos de 100 caracteres.']
  },
  description: {
    type: String,
    required: false,
    default: '',
    validate: [textValidate, 'Descripción inválida'],
    maxlength: [200, 'El título debe tener menos de 200 caracteres.']
  },
  encargado: {
    type: String,
    required: true,
    default: '',
    validate: [textValidate, 'Texto inválido'],
    maxlength: [200, 'El título debe tener menos de 200 caracteres.']
  },  
  equipoApoyo: {
    type: String,
    required: false,
    default: '',
    validate: [textValidate, 'Texto inválido'],
    maxlength: [400, 'El título debe tener menos de 400 caracteres.']
  }, 
  codigoActividad: {
    type: String,
    required: true,
    default: '',
    validate: [textValidate, 'Texto inválido'],
    maxlength: [10, 'El título debe tener menos de 10 caracteres.']
  },
  dateBegin: {
    type: String,
    required: true,
    default: new Date(),
    validate: [dateValidate, 'Fecha inválida']
  },
  dateEnd: {
    type: String,
    required: true,
    validate: [
      {validator: datesValidate, msg: 'La fecha de finalización debe ser mayor que la fecha de inicio'},
      {validator: dateValidate, msg: 'Fecha inválida'}
    ],
    default: new Date()
  },
  allDay: {
    type: Boolean,
    required: true,
    default: true
  },
  timeBegin: {
    type: String,
    default: null,
    validate: [timeRequire, 'Requerido']
  },
  timeEnd: {
    type: String,
    default: null,
    validate: [
      {validator: timeRequire, msg: 'Requerido'},
      {validator: timeEndValidate, msg: 'El tiempo final debe ser mayor que el tiempo inicial'}
    ]
  },
  duration: {
    type: Number,
    required: true,
    default: 0
  },
  periodic: {
    type: Boolean,
    required: true,
    default: false
  },
  week: [Boolean],
  hidden: Boolean,
  group: mongoose.Schema.Types.ObjectId,
  notification: Boolean
});

function textValidate(value) {
  return !value || value.match(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u)[0] === value;
}

function dateValidate(value) {
  const date = value.split('-');
  const year = date[0];
  const month = date[1];
  const day = date[2];
  return (year >= 1970) && (month >= 0 && month < 12) && (day > 0 && day <  32);
}

function datesValidate(value) {
  const date = Date.parse(new Date(value));
  const begin = Date.parse(new Date(value));
  return date - begin >= 0;
}

function timeRequire(value) {
  return this.allDay || value;
}

function timeEndValidate(value) {
  if (this.allDay) return true;
  const time = +value.replace(/:/g, '');
  const begin = +this.timeBegin.replace(/:/g, '');
  return time - begin >= 0;
}

export default mongoose.model('event', eventSchema);