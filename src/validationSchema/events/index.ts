import * as yup from 'yup';

export const eventValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  tags: yup.string(),
  media: yup.string(),
  organizer_id: yup.string().nullable(),
});
