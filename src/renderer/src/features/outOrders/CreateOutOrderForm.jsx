import styled from 'styled-components';
import Form from '../../components/Form';
import Input from '../../components/Input';
import { useDispatch, useSelector } from 'react-redux';
import {
	setCustomerName,
	setCustomerPhone,
	addSellItem,
	setDiscount,
	resetOutOrder,
	setSellItemArray,
} from './outOrderSlice';
import Button from '../../components/Button';

import { useCategory } from '../category/useCategory';

import { useType } from '../type/useType';
import { useSize } from '../size/useSize';
import { useMaterial } from '../material/useMaterial';
import { useManufacture } from '../manufacture/useManufacture';
import { useInventory } from '../inventories/useInventory';
import SmallItemForm from './SmallItemForm';
import { useItems } from '../Iitems/useItems';
import { HiArrowUpOnSquare } from 'react-icons/hi2';
import Spinner from '../../components/Spinner';
import { useEffect, useState } from 'react';
import { useCreateOutOrder } from './useCreateOutOrder';
import { useStanderd } from '../standerd/useStanderd';

const FormCollection = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	font-size: 2rem;
	margin-bottom: 2rem;
	align-items: flex-end;
`;

const FormHeaderCollection = styled.div`
	display: flex;
	justify-content: space-between;
`;

const PriceTag = styled.div`
	text-align: right;
	font-size: 2rem;
	margin-bottom: 2rem;
`;

const TagedDiv = styled.div`
	width: 20%;
	text-align: right;
`;

const ButtonCollection = styled.div`
	display: flex;
	width: 100%;
	gap: 2rem;
	justify-content: end;
`;

function CreateOutOrderForm() {
	const { customerName, customerPhone, sellItemArray, discount } = useSelector((store) => store.outOrder);
	const dispatch = useDispatch();

	const { isCreating, createOutOrder } = useCreateOutOrder();

	const [glopalFlage, setGlobalFlage] = useState(false);

	const { isLoading: isLoadingCategory, categories } = useCategory();

	const { isLoading: isLoadingTypes, types } = useType();

	const { isLoading: isLoadingStanderds, standerds } = useStanderd();

	const { isLoading: isLoadingSizes, sizes } = useSize();

	const { isLoading: isLoadingMaterials, materials } = useMaterial();

	const { isLoading: isLoadingManufactures, manufactures } = useManufacture();

	const { isLoading: isLoadingInventories, inventories } = useInventory();

	const { isLoading: isLoadingItems, items } = useItems();

	const isLoading =
		isLoadingCategory ||
		isLoadingTypes ||
		isLoadingSizes ||
		isLoadingMaterials ||
		isLoadingManufactures ||
		isLoadingInventories ||
		isLoadingItems ||
		isLoadingStanderds ||
		isCreating;

	useEffect(() => {
		// Check if all items have correctItem set to true
		const allItemsCorrect = sellItemArray.every((item) => item.correctItem);
		// Update globalFlag accordingly
		setGlobalFlage(sellItemArray.length > 0 && allItemsCorrect);
	}, [sellItemArray]);

	if (isLoading) return <Spinner />;

	const categoriesOptions = [
		{ value: '', label: 'اختر' },
		...categories.map((category) => ({ value: category.id, label: category.name })),
	];

	const typeOptions = [
		{ value: '', label: 'اختر' },
		...types.map((type) => ({ value: type.id, label: type.name })),
	];

	const sizesOptions = [
		{ value: '', label: 'اختر' },
		...sizes.map((size) => ({ value: size.id, label: size.name })),
	];

	const materialsOptions = [
		{ value: '', label: 'اختر' },
		...materials.map((material) => ({ value: material.id, label: material.name })),
	];

	const standerdsOptions = [
		{ value: '', label: 'اختر' },
		...standerds.map((standerd) => ({ value: standerd.id, label: standerd.name })),
	];

	const manufacturesOptions = [
		{ value: '', label: 'اختر' },
		...manufactures.map((manufacture) => ({ value: manufacture.id, label: manufacture.name })),
	];

	const inventoriesOptions = [
		{ value: '', label: 'اختر' },
		...inventories.map((inventory) => ({ value: inventory.id, label: inventory.location })),
	];

	const totalItemsPrice =
		sellItemArray.reduce(
			(total, currentItem) =>
				Number(total) + (isNaN(Number(currentItem.totalPrice)) ? 0 : Number(currentItem.totalPrice)),
			0
		) - discount;

	function handleSubmit(e) {
		e.preventDefault();
		const outOrder = {
			customerName,
			customerPhone,
			discount: discount === '' ? 0 : discount,
			totalPrice: totalItemsPrice,
			sellItemArray,
		};

		createOutOrder(outOrder, {
			onSuccess: () => {
				dispatch(resetOutOrder());
			},
		});
	}

	function handleReset(e) {
		e.preventDefault();
		dispatch(resetOutOrder());
	}

	function handleAddSellItem() {
		const sellItem = {
			category: '',
			type: '',
			size: '',
			material: '',
			standerd: '',
			manufacture: '',
			inventory: '',
			numberOfPieces: '',
			totalWeight: 0,
			totalPrice: 0,
			correctItem: false,
		};

		dispatch(addSellItem(sellItem));
	}

	function handleDeleteItem(itemId) {
		// Filter out the item with the specified itemId
		const updatedSellItemArray = sellItemArray.filter((item) => item.itemId !== itemId);
		// Update the state with the filtered array
		dispatch(setSellItemArray(updatedSellItemArray));
	}

	console.log(sellItemArray);

	return (
		<>
			<Form onSubmit={handleSubmit} type='reguler'>
				<FormHeaderCollection>
					<TagedDiv>
						<FormCollection>
							<label htmlFor='discount'>الخصم</label>
							<Input
								type='number'
								id='discount'
								value={discount}
								onChange={(e) => dispatch(setDiscount(e.target.value))}
							/>
						</FormCollection>
						<PriceTag>
							<p>السعر الكلي : {totalItemsPrice}</p>
						</PriceTag>
						<ButtonCollection>
							<Button variation='green' disabled={!glopalFlage}>
								انشاء الطلب
							</Button>
							<Button icon={<HiArrowUpOnSquare />} onClick={handleReset}>
								الغاء
							</Button>
						</ButtonCollection>
					</TagedDiv>
					<div>
						<FormCollection>
							<label htmlFor='customerName'>اسم العميل</label>
							<Input
								type='text'
								id='customerName'
								value={customerName}
								onChange={(e) => dispatch(setCustomerName(e.target.value))}
								text='arabic'
							/>
						</FormCollection>
						<FormCollection>
							<label htmlFor='customerPhone'>رقم الهاتف</label>
							<Input
								type='text'
								id='customerPhone'
								value={customerPhone}
								onChange={(e) => dispatch(setCustomerPhone(e.target.value))}
							/>
						</FormCollection>
					</div>
				</FormHeaderCollection>

				{sellItemArray.map((item) => (
					<SmallItemForm
						key={item.itemId}
						item={item}
						categoriesOptions={categoriesOptions}
						typeOptions={typeOptions}
						sizesOptions={sizesOptions}
						materialsOptions={materialsOptions}
						standerdsOptions={standerdsOptions}
						manufacturesOptions={manufacturesOptions}
						inventoriesOptions={inventoriesOptions}
						items={items}
						dispatch={dispatch}
						handleDeleteItem={handleDeleteItem}
					/>
				))}
			</Form>
			<Button onClick={handleAddSellItem}>+</Button>
		</>
	);
}

export default CreateOutOrderForm;
