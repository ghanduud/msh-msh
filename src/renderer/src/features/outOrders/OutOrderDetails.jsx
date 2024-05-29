import { useOutOrder } from './useOutOrder';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useNavigate } from 'react-router-dom';

import Spinner from '../../components/Spinner';
import Row from '../../components/Row';
import styled from 'styled-components';
import Heading from '../../components/Heading';
import Empty from '../../components/Empty';
import Tag from '../../components/Tag';
import ButtonText from '../../components/ButtonText';
import ButtonGroup from '../../components/ButtonGroup';
import Button from '../../components/Button';

import { HiArrowUpOnSquare } from 'react-icons/hi2';
import Modal from '../../components/Modal';
import ConfirmDelete from '../../components/ConfirmDelete';
import OutOrderDataBox from './OutOrderDataBox';
import { useDeleteOutOrder } from './useDeleteOutOrder';
import { useConfirmOutOrder } from './useConfirmOutOrder';
import { useState } from 'react';

const HeadingGroup = styled.div`
	display: flex;
	gap: 2.4rem;
	align-items: center;
`;

function OutOrderDetails() {
	const { outOrder, isLoading } = useOutOrder();
	const moveBack = useMoveBack();
	const navigate = useNavigate();

	const { confirmOutOrder, isConfirming } = useConfirmOutOrder();

	const { isDeleting, deleteOutOrder } = useDeleteOutOrder();

	const [wrongeId, setWrongeId] = useState(null);

	if (isLoading) return <Spinner />;
	if (!outOrder) return <Empty resourceName='طلب' />;

	const { status, id: orderId } = outOrder;

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

	function handleConfirm() {
		confirmOutOrder(
			{ orderId },
			{
				onSuccess: () => moveBack(),
				onError: (e) => setWrongeId(e.message),
			}
		);
	}

	return (
		<>
			<Row type='horizontal'>
				<HeadingGroup>
					<Heading as='h1'>طلب رقم {orderId}</Heading>
					<Tag type={statusToTagName[status]}>{statusToArabic[status]}</Tag>
				</HeadingGroup>
				<ButtonText onClick={moveBack}>&larr; رجوع</ButtonText>
			</Row>

			<OutOrderDataBox order={outOrder} wrongeId={wrongeId} />

			<ButtonGroup>
				{status === 'unconfirmed' && (
					<Button variation='green' onClick={handleConfirm} disabled={isConfirming}>
						تأكيد
					</Button>
				)}

				{status === 'confirmed' && <Button icon={<HiArrowUpOnSquare />}>استرجاع</Button>}

				<Modal>
					<Modal.Open opens='delete'>
						<Button variation='danger'>مسح الطلب</Button>
					</Modal.Open>

					<Modal.Window name='delete'>
						<ConfirmDelete
							resourceName='الطلب'
							disabled={isDeleting}
							onConfirm={() =>
								deleteOutOrder(
									{ orderId },
									{
										onSettled: () => navigate(-1),
									}
								)
							}
						/>
					</Modal.Window>
				</Modal>

				<Button variation='secondary' onClick={moveBack}>
					رجوع
				</Button>
			</ButtonGroup>
		</>
	);
}

export default OutOrderDetails;
