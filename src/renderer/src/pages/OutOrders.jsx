import Heading from '../components/Heading';
import Row from '../components/Row';
import OutOrdersTable from '../features/outOrders/OutOrdersTable';

function OutOrders() {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>طلبيات البيع</Heading>
			</Row>

			<OutOrdersTable />
		</>
	);
}

export default OutOrders;
