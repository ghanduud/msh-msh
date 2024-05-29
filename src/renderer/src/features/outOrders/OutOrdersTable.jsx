import { useOutOrders } from './useOutOrders';
import Spinner from '../../components/Spinner';
import Empty from '../../components/Empty';
import Menus from '../../components/Menus';
import Table from '../../components/Table';
import OutOrderRow from './OutOrderRow';

function OutOrdersTable() {
	const { isLoading, outOrders } = useOutOrders();

	if (isLoading) return <Spinner />;

	if (!outOrders.length) return <Empty resourceName='bookings' />;

	// Sort the outOrders by createdAt date, latest first
	const sortedOutOrders = [...outOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

	return (
		<Menus>
			<Table columns='.5fr 1fr 1fr 0.7fr 1fr 1fr 1fr .2fr'>
				<Table.Header>
					<div>رقم الطلب</div>
					<div>اسم العميل</div>
					<div>وقت الانشاء</div>
					<div>الحالة</div>
					<div>وقت التاكيد</div>
					<div>الخصم</div>
					<div>السعر الكلي</div>
					<div></div>
				</Table.Header>

				<Table.Body data={sortedOutOrders} render={(order) => <OutOrderRow order={order} key={order.id} />} />
			</Table>
		</Menus>
	);
}

export default OutOrdersTable;
