import styled from 'styled-components';
import Heading from '../../components/Heading';
import Select from '../../components/Select';

import {
	setCategoryForItem,
	setInventoryForItem,
	setItemIsCorrect,
	setManufactureForItem,
	setMaterialForItem,
	setNumberOfPiecesForItem,
	setSizeForItem,
	setTotalPriceForItem,
	setTotalWeightForItem,
	setTypeForItem,
} from './outOrderSlice';
import Input from '../../components/Input';
import { useEffect } from 'react';

const FormCollection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	font-size: 2rem;
	margin-bottom: 2rem;
	align-items: center;
	width: 20%;
	font-size: 2rem;
	& * {
		width: 100%;
	}
`;

const PriceI = styled(FormCollection)`
	background-color: var(--color-indigo-100);
	color: var(--color-indigo-700);
	padding: 0.5rem;
	border-radius: 3rem;
	text-align: center;
	margin-top: 2rem;
`;
const Price = styled(FormCollection)`
	background-color: var(--color-green-100);
	color: var(--color-green-700);
	padding: 0.5rem;
	border-radius: 3rem;
	text-align: center;
	margin-top: 2rem;
`;

const WeightI = styled(FormCollection)`
	background-color: var(--color-blue-100);
	color: var(--color-blue-700);
	padding: 0.5rem;
	border-radius: 3rem;
	text-align: center;
	margin-top: 2rem;
`;
const Weight = styled(FormCollection)`
	background-color: var(--color-yellow-100);
	color: var(--color-yellow-700);
	padding: 0.5rem;
	border-radius: 3rem;
	text-align: center;
	margin-top: 2rem;
`;

const MinorForm = styled.div`
	margin: 2rem 0;
	border: 1px solid var(--color-grey-400);
	width: 100%;
	text-align: right;
	padding: 2rem;
	width: 100%;
	border-radius: 2rem;
	position: relative;
`;

const FormItemSelection = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	gap: 1rem;
	margin: 3rem 0;
`;

const DeleteSmallForm = styled.div`
	position: absolute;
	left: 1rem;
	top: 0;
	font-size: 4rem;
	font-weight: 600;
	color: var(--color-indigo-100); /* Change the color here */
	cursor: pointer;
`;

function SmallItemForm({
	categoriesOptions,
	typeOptions,
	sizesOptions,
	materialsOptions,
	manufacturesOptions,
	inventoriesOptions,
	item,
	items,
	dispatch,
	handleDeleteItem,
}) {
	const filedsIsChoosen =
		item.category === '' ||
		item.type === '' ||
		item.size === '' ||
		item.material === '' ||
		item.manufacture === '' ||
		item.inventory === ''
			? false
			: true;

	const itemFromInventory =
		filedsIsChoosen &&
		items.find(
			(i) =>
				i.id ===
				`${item.category}-${item.type}-${item.size}-${item.material}-${item.manufacture}-${item.inventory}`
		);

	const weightPerPiece = filedsIsChoosen
		? itemFromInventory
			? itemFromInventory.weightPerPiece
			: 'هذه القطعة غير موجودة بالمخازن'
		: 'اختر قطعة';

	const pricePerKilo = filedsIsChoosen
		? itemFromInventory
			? itemFromInventory.pricePerKilo
			: 'هذه القطعة غير موجودة بالمخازن'
		: 'اختر قطعة';

	// Update total weight and total price when number of pieces changes
	useEffect(() => {
		const totalWeight = isNaN(weightPerPiece * item.numberOfPieces)
			? 0
			: weightPerPiece * item.numberOfPieces;
		const totalPrice = isNaN((weightPerPiece * item.numberOfPieces * pricePerKilo).toFixed(2))
			? 0
			: (weightPerPiece * item.numberOfPieces * pricePerKilo).toFixed(2);

		dispatch(setTotalWeightForItem({ id: item.itemId, totalWeight }));
		dispatch(setTotalPriceForItem({ id: item.itemId, totalPrice }));
	}, [item.numberOfPieces, item]);

	useEffect(() => {
		dispatch(
			setItemIsCorrect({
				id: item.itemId,
				correctItem: filedsIsChoosen && itemFromInventory && !(item.numberOfPieces === '') ? true : false,
			})
		);
	}, [filedsIsChoosen, itemFromInventory, item.numberOfPieces]);

	return (
		<MinorForm>
			<DeleteSmallForm onClick={() => handleDeleteItem(item.itemId)}>&times;</DeleteSmallForm>
			<Heading>القطعة المباعة</Heading>
			<FormItemSelection>
				<FormCollection>
					<label htmlFor='inventory'>المخزن</label>
					<Select
						options={inventoriesOptions}
						value={item.inventory}
						onChange={(e) => dispatch(setInventoryForItem({ id: item.itemId, inventory: e.target.value }))}
						id='inventory'
					/>
				</FormCollection>
				<FormCollection>
					<label htmlFor='manufacture'>المصنع</label>
					<Select
						options={manufacturesOptions}
						value={item.manufacture}
						onChange={(e) =>
							dispatch(setManufactureForItem({ id: item.itemId, manufacture: e.target.value }))
						}
						id='manufacture'
					/>
				</FormCollection>
				<FormCollection>
					<label htmlFor='material'>الخامة</label>
					<Select
						options={materialsOptions}
						value={item.material}
						onChange={(e) => dispatch(setMaterialForItem({ id: item.itemId, material: e.target.value }))}
						id='material'
					/>
				</FormCollection>
				<FormCollection>
					<label htmlFor='size'>المقاس</label>
					<Select
						options={sizesOptions}
						value={item.size}
						onChange={(e) => dispatch(setSizeForItem({ id: item.itemId, size: e.target.value }))}
						id='size'
					/>
				</FormCollection>
				<FormCollection>
					<label htmlFor='type'>النوع</label>
					<Select
						options={typeOptions}
						value={item.type}
						onChange={(e) => dispatch(setTypeForItem({ id: item.itemId, type: e.target.value }))}
						id='type'
					/>
				</FormCollection>
				<FormCollection>
					<label htmlFor='category'>الصنف</label>
					<Select
						options={categoriesOptions}
						value={item.category}
						onChange={(e) => dispatch(setCategoryForItem({ id: item.itemId, category: e.target.value }))}
						id='category'
					/>
				</FormCollection>
			</FormItemSelection>
			<FormItemSelection>
				<Price>
					<p>السعر الكلي</p>
					<p>{isNaN(item.totalPrice) ? '0' : item.totalPrice}</p>
				</Price>
				<Weight>
					<p>الوزن الكلي</p>
					<p>{isNaN(item.totalWeight) ? '0' : item.totalWeight}</p>
				</Weight>
				<PriceI>
					<p>سعر الكيلو</p>
					<p>{pricePerKilo}</p>
				</PriceI>
				<WeightI>
					<p>وزن القطعة</p>
					<p>{weightPerPiece}</p>
				</WeightI>
				<FormCollection>
					<label htmlFor='numberOfPieces'>عددالقطع</label>
					<Input
						type='number'
						value={item.numberOfPieces}
						onChange={(e) =>
							dispatch(setNumberOfPiecesForItem({ id: item.itemId, numberOfPieces: e.target.value }))
						}
						id='numberOfPieces'
						disabled={!(filedsIsChoosen && itemFromInventory)}
					/>
				</FormCollection>
			</FormItemSelection>
		</MinorForm>
	);
}

export default SmallItemForm;
