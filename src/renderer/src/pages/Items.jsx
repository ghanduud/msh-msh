import Row from '../components/Row';
import Heading from '../components/Heading';
import ItemTable from '../features/Iitems/ItemTable';
import ItemOperations from '../features/Iitems/ItemOperations';
import AddItem from '../features/Iitems/AddItem';

function Items() {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>البضائع</Heading>
			</Row>
			<Row type='horizontal'>
				<AddItem />
				<ItemOperations />
			</Row>

			<Row>
				<ItemTable />
			</Row>
		</>
	);
}

export default Items;
