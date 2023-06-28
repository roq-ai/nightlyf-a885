import * as yup from 'yup';

export const partyStreakValidationSchema = yup.object().shape({
  streak_count: yup.number().integer(),
  user_id: yup.string().nullable(),
});
