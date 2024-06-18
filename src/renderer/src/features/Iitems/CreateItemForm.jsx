import { useForm } from 'react-hook-form';

import { useCreateItem } from './useCreateItem';
import { useCategory } from '../category/useCategory';

import { useMaterial } from '../material/useMaterial';
import { useSize } from '../size/useSize';
import { useType } from '../type/useType';

import Form from '../../components/Form';
import FormRow from '../../components/FormRow';
import SelectForm from '../../components/SelectForm';
import Spinner from '../../components/Spinner';
import Input from '../../components/Input';
import Button from '../../components/Button';

function CreateItemForm({ onCloseModal }) {
	const { isLoading: isLoadingCategory, categories } = useCategory();

	const { isLoading: isLoadingMaterial, materials } = useMaterial();
	const { isLoading: isLoadingSize, sizes } = useSize();
	const { isLoading: isLoadingType, types } = useType();

	const isLoading = isLoadingCategory || isLoadingMaterial || isLoadingSize || isLoadingType;

	const { isCreating, createItem } = useCreateItem();

	const { register, handleSubmit, reset, formState } = useForm();

	const { errors } = formState;

	function onSubmit(data) {
		createItem(data, {
			onSuccess: () => {
				reset();
				onCloseModal?.();
			},
		});
	}

	function onError(errors) {
		console.log(errors);
	}

	if (isLoading) return <Spinner />;

	return (
		<Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? 'modal' : 'regular'}>
			<FormRow label='الصنف' error={errors?.categoryId?.message}>
				<SelectForm
					options={categories.map((category) => ({ value: category.id, label: category.name }))}
					register={register}
					type='white'
					name='categoryId' // Make sure to provide a name for the select element
				/>
			</FormRow>
			<FormRow label='الخامة' error={errors?.materialId?.message}>
				<SelectForm
					options={materials.map((material) => ({ value: material.id, label: material.name }))}
					register={register}
					type='white'
					name='materialId' // Make sure to provide a name for the select element
				/>
			</FormRow>
			<FormRow label='النوع' error={errors?.typeId?.message}>
				<SelectForm
					options={types.map((type) => ({ value: type.id, label: type.name }))}
					register={register}
					type='white'
					name='typeId' // Make sure to provide a name for the select element
				/>
			</FormRow>
			<FormRow label='المقاس' error={errors?.sizeId?.message}>
				<SelectForm
					options={sizes.map((size) => ({ value: size.id, label: size.name }))}
					register={register}
					type='white'
					name='sizeId' // Make sure to provide a name for the select element
				/>
			</FormRow>

			<FormRow label='سعر الكيلو' error={errors?.pricePerKilo?.message}>
				<Input
					type='number'
					id='pricePerKilo'
					step='any' // Allows for decimal numbers
					disabled={isCreating}
					{...register('pricePerKilo', {
						required: 'This field is required',
					})}
				/>
			</FormRow>
			<FormRow label='وزن القطعة' error={errors?.weightPerPiece?.message}>
				<Input
					type='number'
					id='weightPerPiece'
					step='any' // Allows for decimal numbers
					disabled={isCreating}
					{...register('weightPerPiece', {
						required: 'This field is required',
					})}
				/>
			</FormRow>

			<FormRow>
				<Button variation='secondary' type='reset' onClick={() => onCloseModal?.()}>
					الغاء
				</Button>
				<Button disabled={isCreating}>اضافة البضائع</Button>
			</FormRow>
		</Form>
	);
}

export default CreateItemForm;
