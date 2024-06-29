import { useForm } from 'react-hook-form';

import { useCreateStanderd } from './useCreateStanderd';
import { useUpdateStanderd } from './useUpdateStanderd';

import Form from '../../components/Form';
import FormRow from '../../components/FormRow';
import Input from '../../components/Input';
import Button from '../../components/Button';

function CreateUpdateStanderdForm({ standerdToUpdate = {}, onCloseModal }) {
	const { isCreating, createStanderd } = useCreateStanderd();
	const { isUpdateing, updateStanderd } = useUpdateStanderd();

	const isWorking = isCreating || isUpdateing;

	const { id: updateId, ...updateValues } = standerdToUpdate;
	const isUpdatingSession = Boolean(updateId);

	const { register, handleSubmit, reset, formState } = useForm({
		defaultValues: isUpdatingSession ? updateValues : {},
	});

	const { errors } = formState;

	function onSubmit(data) {
		if (isUpdatingSession) {
			updateStanderd(
				{ ...data, id: updateId },
				{
					onSuccess: () => {
						reset();
						onCloseModal?.();
					},
				}
			);
		} else {
			createStanderd(data, {
				onSuccess: () => {
					reset();
					onCloseModal?.();
				},
			});
		}
	}

	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'Modal' : 'reguler'}>
			<FormRow label='المعيار' error={errors?.name?.message}>
				<Input
					type='text'
					id='name'
					disabled={isWorking}
					{...register('name', {
						required: 'This field is required',
					})}
				/>
			</FormRow>
			<FormRow>
				<Button variation='secondary' type='reset' onClick={() => onCloseModal?.()}>
					الغاء
				</Button>
				<Button disabled={isWorking}>{isUpdatingSession ? 'تعديل المعيار' : 'اضافة المعيار'}</Button>
			</FormRow>
		</Form>
	);
}

export default CreateUpdateStanderdForm;
