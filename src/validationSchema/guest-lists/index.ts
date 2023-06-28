import * as yup from 'yup';

export const guestListValidationSchema = yup.object().shape({
  user_id: yup.string().nullable(),
  event_id: yup.string().nullable(),
});
