import Heading from '../components/Heading';
import Row from '../components/Row';
import AddCategory from '../features/category/AddCategory';
import CategoriesTable from '../features/category/CategoriesTable';

function Categories() {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>الاصناف</Heading>
			</Row>

			<Row>
				<CategoriesTable />
				<AddCategory />
			</Row>
		</>
	);
}

export default Categories;
