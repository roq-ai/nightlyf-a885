import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createPartyStreak } from 'apiSdk/party-streaks';
import { Error } from 'components/error';
import { partyStreakValidationSchema } from 'validationSchema/party-streaks';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { PartyStreakInterface } from 'interfaces/party-streak';

function PartyStreakCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: PartyStreakInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createPartyStreak(values);
      resetForm();
      router.push('/party-streaks');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<PartyStreakInterface>({
    initialValues: {
      streak_count: 0,
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: partyStreakValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Party Streak
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="streak_count" mb="4" isInvalid={!!formik.errors?.streak_count}>
            <FormLabel>Streak Count</FormLabel>
            <NumberInput
              name="streak_count"
              value={formik.values?.streak_count}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('streak_count', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.streak_count && <FormErrorMessage>{formik.errors?.streak_count}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'party_streak',
  operation: AccessOperationEnum.CREATE,
})(PartyStreakCreatePage);
