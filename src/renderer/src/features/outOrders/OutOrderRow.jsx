import styled from 'styled-components';
import Table from '../../components/Table';
import { formatDateString } from '../../utils/helpers';
import Tag from '../../components/Tag';
import Menus from '../../components/Menus';

import { HiEye, HiTrash } from 'react-icons/hi2';

import { useNavigate } from 'react-router-dom';
import Modal from '../../components/Modal';
import ConfirmDelete from '../../components/ConfirmDelete';
import { useDeleteOutOrder } from './useDeleteOutOrder';

const Cell = styled.div`
	text-align: center;
	font-size: 1.6rem;
	margin: 1rem;

	font-weight: 600;
	color: var(--color-grey-600);
	font-family: 'Sono';
`;

const Toggle = styled.div`
	margin-right: 1rem;
`;

const Stacked = styled.div`
	display: flex;
	flex-direction: column;
	gap: 0.2rem;

	& span:first-child {
		font-weight: 600;
		font-size: 2rem;
		color: var(--color-grey-600);
		font-family: 'Sono';
	}

	& span:last-child {
		color: var(--color-grey-500);
		font-size: 1.2rem;
	}
`;

function OutOrderRow({
	order: { id: orderId, customerName, totalPrice, createdAt, discount, status, customerPhone, confirmDate },
}) {
	const navigate = useNavigate();

	const { isDeleting, deleteOutOrder } = useDeleteOutOrder();

	const strCreatedAt = formatDateString(createdAt);
	const strConfirmedAt = formatDateString(confirmDate);

	const statusToTagName = {
		unconfirmed: 'green',
		retreved: 'red',
		confirmed: 'silver',
	};

	const statusToArabic = {
		unconfirmed: 'غير مؤكد',
		retreved: 'مرتجع',
		confirmed: 'مؤكد',
	};

	return (
		<Table.Row>
			<Cell>{orderId}</Cell>
			<Cell>
				<Stacked>
					<span>{customerName}</span>
					<span>{customerPhone}</span>
				</Stacked>
			</Cell>
			<Cell>{strCreatedAt}</Cell>
			<Tag type={statusToTagName[status]}>{statusToArabic[status]}</Tag>
			<Cell>{strConfirmedAt}</Cell>
			<Cell>{discount}</Cell>
			<Cell>{totalPrice}</Cell>
			<Toggle>
				<Modal>
					<Menus.Menu>
						<Menus.Toggle id={orderId} />

						<Menus.List id={orderId}>
							<Menus.Button icon={<HiEye />} onClick={() => navigate(`/outOrder/${orderId}`)}>
								عرض التفاصيل
							</Menus.Button>
							<Modal.Open opens='delete'>
								<Menus.Button menutype='delete' icon={<HiTrash />}>
									مسح
								</Menus.Button>
							</Modal.Open>
						</Menus.List>
					</Menus.Menu>

					<Modal.Window name='delete'>
						<ConfirmDelete
							resourceName='الطلب'
							disabled={isDeleting}
							onConfirm={() => deleteOutOrder({ orderId })}
						/>
					</Modal.Window>
				</Modal>
			</Toggle>
		</Table.Row>
	);
}

export default OutOrderRow;
