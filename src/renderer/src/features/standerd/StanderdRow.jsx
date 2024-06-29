import styled from 'styled-components';
import Table from '../../components/Table';
import Modal from '../../components/Modal';
import Menus from '../../components/Menus';
import ConfirmDelete from '../../components/ConfirmDelete';
import CreateUpdateStanderdForm from './CreateUpdateStanderdForm';

import { HiPencil, HiTrash } from 'react-icons/hi2';
import { useDeleteStanderd } from './useDeleteStanderd';

const Cell = styled.div`
	padding: 1.3rem 2.4rem;
	font-family: sans-serif;
	border-left: 1px solid var(--color-grey-200);
	text-align: center;
	font-size: 2rem;
	font-weight: 500;
	color: var(--color-grey-700);
`;

const Toggle = styled.div`
	margin-right: 1rem;
`;

function StanderdRow({ standerd }) {
	const { isDeleting, deleteStanderd } = useDeleteStanderd();

	const { id: standerdId, name } = standerd;

	return (
		<Table.Row>
			<Cell>{name}</Cell>
			<Toggle>
				<Modal>
					<Menus.Menu>
						<Menus.Toggle id={standerdId} />

						<Menus.List id={standerdId}>
							<Modal.Open opens='Update'>
								<Menus.Button icon={<HiPencil />}>تعديل</Menus.Button>
							</Modal.Open>
							<Modal.Open opens='delete'>
								<Menus.Button menutype='delete' icon={<HiTrash />}>
									مسح
								</Menus.Button>
							</Modal.Open>
						</Menus.List>

						<Modal.Window name='Update'>
							<CreateUpdateStanderdForm standerdToUpdate={standerd} />
						</Modal.Window>

						<Modal.Window name='delete'>
							<ConfirmDelete
								resourceName='النوع'
								disabled={isDeleting}
								onConfirm={() => deleteStanderd({ id: standerdId })}
							/>
						</Modal.Window>
					</Menus.Menu>
				</Modal>
			</Toggle>
		</Table.Row>
	);
}

export default StanderdRow;
