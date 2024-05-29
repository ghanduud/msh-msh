import Heading from '../components/Heading';
import Row from '../components/Row';
import CreateOutOrderForm from '../features/outOrders/CreateOutOrderForm';

function CreateOutOrder() {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>طلب بيع</Heading>
			</Row>

			<Row>
				<CreateOutOrderForm />
			</Row>
		</>
	);
}

export default CreateOutOrder;
