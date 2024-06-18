import { useForm } from 'react-hook-form';
import Form from '../../components/Form';
import FormRow from '../../components/FormRow';
import { useUpdatePrice } from './useUpdatePrice';
import Input from '../../components/Input';
import Button from '../../components/Button';

function UpdatePriceForm({ itemPriceToUpdate, onCloseModal }) {
	const { updatePrice, isUpdating } = useUpdatePrice();

	const { id: updateId, ...updateValues } = itemPriceToUpdate;

	const { register, handleSubmit, reset, formState } = useForm({
		defaultValues: updateValues,
	});

	const { errors } = formState;

	function onSubmit(data) {
		updatePrice(
			{ ...data, id: updateId },
			{
				onSuccess: () => {
					reset();
					onCloseModal?.();
				},
			}
		);
	}

	function onError(errors) {
		console.log(errors);
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'Modal' : 'reguler'}>
			<FormRow label='السعر الجديد' error={errors?.pricePerKilo?.message}>
				<Input
					type='number'
					id='pricePerKilo'
					step='any'
					disabled={isUpdating}
					{...register('pricePerKilo')}
				/>
			</FormRow>
			<FormRow label='العدد الجديد' error={errors?.numberOfPieces?.message}>
				<Input type='number' id='numberOfPieces' disabled={isUpdating} {...register('numberOfPieces')} />
			</FormRow>
			<FormRow label='الوزن الجديد' error={errors?.weightPerPiece?.message}>
				<Input
					type='number'
					id='weightPerPiece'
					step='any'
					disabled={isUpdating}
					{...register('weightPerPiece')}
				/>
			</FormRow>
			<FormRow label='ملاحظة' error={errors?.weightPerPiece?.message}>
				<Input type='text' id='note' disabled={isUpdating} {...register('note')} />
			</FormRow>
			<FormRow>
				<Button variation='secondary' type='reset' onClick={() => onCloseModal?.()}>
					الغاء
				</Button>

				<Button disabled={isUpdating}>تغيير</Button>
			</FormRow>
		</Form>
	);
}

export default UpdatePriceForm;
