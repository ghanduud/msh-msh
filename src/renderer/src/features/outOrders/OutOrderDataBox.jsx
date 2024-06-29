import styled from 'styled-components';

import Logo from '../../components/Logo';
import { formatDateString } from '../../utils/helpers';

const StyledBookingDataBox = styled.section`
	/* Box */
	background-color: var(--color-grey-0);
	border: 1px solid var(--color-grey-100);
	border-radius: var(--border-radius-md);

	overflow: hidden;
`;

const Header = styled.header`
	background-color: var(--color-brand-500);
	padding: 2rem 4rem;
	color: #e0e7ff;
	font-size: 2.5rem;
	font-weight: 500;
	display: flex;
	align-items: center;
	justify-content: space-between;

	svg {
		height: 3.2rem;
		width: 3.2rem;
	}

	& div:last-child {
		display: flex;
		align-items: center;
		gap: 1.6rem;
		font-weight: 600;
		font-size: 2.5rem;
	}

	& span {
		font-family: 'Sono';
		font-size: 2rem;
		margin-left: 4px;
	}
`;

const Section = styled.section`
	padding: 3.2rem 4rem 1.2rem;
`;

const SellItem = styled.div`
	display: flex;
	align-items: center;
	gap: 1.2rem;
	margin-bottom: 1.6rem;
	color: var(--color-grey-500);

	justify-content: space-between;
	width: 100%;
	font-size: 2rem;
	font-weight: 500;

	& * {
		font-weight: 500;
		color: var(--color-grey-700);
	}
`;

const Price = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem 2rem;
	border-radius: var(--border-radius-sm);
	/* margin-top: 2.4rem; */
	width: 15%;

	background-color: var(--color-green-100);
	color: var(--color-green-700);

	& p:last-child {
		text-transform: uppercase;
		font-size: 1.4rem;
		font-weight: 600;
	}

	svg {
		height: 2.4rem;
		width: 2.4rem;
		color: currentColor !important;
	}
`;

const Number = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem 2rem;
	border-radius: var(--border-radius-sm);
	/* margin-top: 2.4rem; */
	width: 15%;

	background-color: var(--color-yellow-100);
	color: var(--color-yellow-700);

	& p:last-child {
		text-transform: uppercase;
		font-size: 1.4rem;
		font-weight: 600;
	}

	svg {
		height: 2.4rem;
		width: 2.4rem;
		color: currentColor !important;
	}
`;

const Weight = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem 2rem;
	border-radius: var(--border-radius-sm);
	/* margin-top: 2.4rem; */
	width: 15%;

	background-color: var(--color-indigo-100);
	color: var(--color-indigo-700);

	& p:last-child {
		text-transform: uppercase;
		font-size: 1.4rem;
		font-weight: 600;
	}

	svg {
		height: 2.4rem;
		width: 2.4rem;
		color: currentColor !important;
	}
`;

const Manufacture = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem 2rem;
	border-radius: var(--border-radius-sm);
	/* margin-top: 2.4rem; */
	width: 15%;

	background-color: var(--color-blue-100);
	color: var(--color-blue-700);

	& p:last-child {
		text-transform: uppercase;
		font-size: 1.4rem;
		font-weight: 600;
	}

	svg {
		height: 2.4rem;
		width: 2.4rem;
		color: currentColor !important;
	}
`;

const Inventory = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 1rem 2rem;
	border-radius: var(--border-radius-sm);
	/* margin-top: 2.4rem; */
	width: 15%;

	background-color: var(--color-silver-100);
	color: var(--color-silver-700);

	& p:last-child {
		text-transform: uppercase;
		font-size: 1.4rem;
		font-weight: 600;
	}

	svg {
		height: 2.4rem;
		width: 2.4rem;
		color: currentColor !important;
	}
`;

const Items = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	padding: 1rem 2rem;
	border-radius: var(--border-radius-sm);
	/* margin-top: 2.4rem; */
	width: 25%;

	& p:last-child {
		text-transform: uppercase;
		font-size: 1.4rem;
		font-weight: 600;
	}

	svg {
		height: 2.4rem;
		width: 2.4rem;
		color: currentColor !important;
	}

	/* Conditionally change color based on props */
	background-color: ${(props) => (props.wrong ? 'var(--color-red-800)' : '')};
`;

const Footer = styled.footer`
	padding: 1.6rem 4rem;
	font-size: 2rem;
	/* color: var(--color-grey-500); */
	text-align: right;
`;

function OutOrderDataBox({ order, wrongeId }) {
	const {
		id: orderId,
		customerName,
		customerPhone,
		totalPrice,
		discount,
		createdAt,
		confirmDate,
		sellItems,
	} = order;

	const strCreatedAt = formatDateString(createdAt);
	const strConfirmedAt = formatDateString(confirmDate);

	const priceBeforeDiscount = totalPrice + discount;

	return (
		<StyledBookingDataBox>
			<Header>
				<p>
					{strCreatedAt} &nbsp;&nbsp;-&nbsp;&nbsp;{' '}
					{strConfirmedAt === '-' ? 'لم يتم التأكيد بعد' : strConfirmedAt}
				</p>
				<div>
					<p>
						طلب رقم {orderId} &nbsp;&nbsp;-&nbsp;&nbsp; {customerName} &nbsp;&nbsp;-&nbsp;&nbsp;{' '}
						{customerPhone}
					</p>
					<Logo />
				</div>
			</Header>
			<Section>
				{sellItems.map((item) => (
					<SellItem key={item.id}>
						<Price>السعر : {item.totalPrice}</Price>

						<Number>عدد القطع : {item.numberOfPieces}</Number>

						<Weight>الوزن : {item.totalWeight}</Weight>

						<Manufacture>المصنع : {item.manufacture}</Manufacture>

						<Inventory>المخزن : {item.inventory}</Inventory>

						{/* Pass wronge prop to Items component */}
						<Items wrong={wrongeId === item.id}>
							القطعة : {item.category} &nbsp; {item.type} &nbsp; {item.size} &nbsp; {item.material} &nbsp;
							{item.standerd}
						</Items>
					</SellItem>
				))}
			</Section>
			<Footer>
				<p>السعر قبل الخصم: {priceBeforeDiscount}</p>
				<p>الخصم : {discount}</p>
				<p>السعر الكلي : {totalPrice}</p>
			</Footer>
		</StyledBookingDataBox>
	);
}

export default OutOrderDataBox;
