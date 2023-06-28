import * as yup from 'yup';

export const sosValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
  event_id: yup.string().nullable(),
});
