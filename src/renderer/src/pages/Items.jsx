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
				<ItemOperations />
			</Row>

			<Row>
				<ItemTable />
				<AddItem />
			</Row>
		</>
	);
}

export default Items;
