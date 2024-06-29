import styled, { css } from 'styled-components';

import { TbTransform } from 'react-icons/tb';

import Table from '../../components/Table';
import Menus from '../../components/Menus';
import Modal from '../../components/Modal';
import TransfareItemForm from './TransfareItemForm';
import { HiPencil, HiTrash } from 'react-icons/hi2';
import { useDeleteItem } from './useDeleteItem';

import ConfirmDelete from '../../components/ConfirmDelete';
import UpdatePriceForm from './UpdatePriceForm';
import { useDispatch } from 'react-redux';
import { addSellItem } from '../outOrders/outOrderSlice';
import { RiBillLine } from 'react-icons/ri';

const Cell = styled.div`
	padding: 1.3rem 2rem;
	font-family: sans-serif;
	border-left: 1px solid var(--color-grey-200);
	text-align: center;
	font-size: 1.4rem;
	font-weight: 500;
	color: var(--color-grey-700);
`;

const NumberOfPiecesCell = styled(Cell)`
	${({ pieces }) => {
		if (pieces === 0) {
			return css`
				background-color: var(--color-red-700);
			`;
		} else if (pieces >= 1 && pieces <= 10) {
			return css`
				background-color: var(--color-yellow-100);
			`;
		} else if (pieces > 10) {
			return css`
				background-color: var(--color-green-100);
			`;
		}
	}}
`;

const Toggle = styled.div`
	margin-right: 1rem;
`;

function ItemRow({ item }) {
	const { isDeleting, deleteItem } = useDeleteItem();
	const dispatch = useDispatch();

	const {
		id: itemId,
		category,
		material,
		inventoryLocation,
		manufacture,
		numberOfPieces,
		// pricePerKilo,
		size,
		type,
		standerd,
		weightPerPiece,
		note,
	} = item;

	const totalWeight = numberOfPieces * weightPerPiece;
	// const totalPrice = totalWeight * pricePerKilo;

	function handleAddSellItem(id) {
		const [category, type, size, material, standerd, manufacture, inventory] = id.split('-');

		const sellItem = {
			category: category,
			type: type,
			size: size,
			material: material,
			standerd: standerd,
			manufacture: manufacture,
			inventory: inventory,
			numberOfPieces: '',
			totalWeight: 0,
			totalPrice: 0,
			correctItem: false,
		};

		dispatch(addSellItem(sellItem));
	}

	return (
		<Table.Row>
			<Cell>{category}</Cell>
			<Cell>{type}</Cell>
			<Cell>{size}</Cell>
			<Cell>{material}</Cell>
			<Cell>{standerd}</Cell>
			<Cell>{manufacture}</Cell>
			<Cell>{weightPerPiece}</Cell>
			<NumberOfPiecesCell pieces={numberOfPieces}>{numberOfPieces}</NumberOfPiecesCell>
			<Cell>{totalWeight}</Cell>
			<Cell>{note}</Cell>
			<Cell>{inventoryLocation}</Cell>
			<Toggle>
				<Modal>
					<Menus.Menu>
						<Menus.Toggle id={itemId} />

						<Menus.List id={itemId}>
							<Modal.Open opens='transfare'>
								<Menus.Button icon={<TbTransform />}>نقل بضائع</Menus.Button>
							</Modal.Open>
							<Modal.Open opens='updatePrice'>
								<Menus.Button icon={<HiPencil />}>تغيير </Menus.Button>
							</Modal.Open>
							<Menus.Button icon={<RiBillLine />} onClick={() => handleAddSellItem(itemId)}>
								اضافة الي طلب
							</Menus.Button>
							<Modal.Open opens='delete'>
								<Menus.Button menutype='delete' icon={<HiTrash />}>
									مسح
								</Menus.Button>
							</Modal.Open>
						</Menus.List>

						<Modal.Window name='transfare'>
							<TransfareItemForm itemToTransferFrom={item} totalItemWeight={totalWeight} />
						</Modal.Window>

						<Modal.Window name='delete'>
							<ConfirmDelete
								resourceName='البضائع'
								disabled={isDeleting}
								onConfirm={() => deleteItem({ id: itemId })}
							/>
						</Modal.Window>
						<Modal.Window name='updatePrice'>
							<UpdatePriceForm itemPriceToUpdate={item} />
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</Toggle>
		</Table.Row>
	);
}

export default ItemRow;
