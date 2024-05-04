import Menus from '../../components/Menus';
import Table from '../../components/Table';
import Spinner from '../../components/Spinner';
import Empty from '../../components/Empty';

import { useItems } from './useItems';
import ItemRow from './ItemRow';
import { useSearchParams } from 'react-router-dom';

function ItemTable() {
	const { isLoading, items } = useItems();
	console.log(items);

	const [searchParams] = useSearchParams();

	if (isLoading) return <Spinner />;
	if (!items?.length) return <Empty resourceName='Items' />;

	const categoryValue = searchParams.get('categoryFilter') || '';
	const inventoryValue = searchParams.get('inventoryFilter') || '';
	const sizeValue = searchParams.get('sizeFilter') || '';
	const typeValue = searchParams.get('typeFilter') || '';
	const manufactureValue = searchParams.get('manufactureFilter') || '';
	const materialValue = searchParams.get('materialFilter') || '';

	let filteredItems = [...items];

	if (categoryValue !== '')
		filteredItems = [...filteredItems.filter((item) => item.category === categoryValue)];
	if (inventoryValue !== '')
		filteredItems = [...filteredItems.filter((item) => item.inventoryLocation === inventoryValue)];
	if (sizeValue !== '') filteredItems = [...filteredItems.filter((item) => item.size === sizeValue)];
	if (typeValue !== '') filteredItems = [...filteredItems.filter((item) => item.type === typeValue)];
	if (manufactureValue !== '')
		filteredItems = [...filteredItems.filter((item) => item.manufacture === manufactureValue)];
	if (materialValue !== '')
		filteredItems = [...filteredItems.filter((item) => item.material === materialValue)];

	return (
		<Menus>
			<Table columns='0.8fr 0.8fr 1fr .5fr 1.2fr .8fr .8fr .8fr .8fr 0.8fr 0.7fr 0.1fr'>
				<Table.Header>
					<div>الصنف</div>
					<div>الخامة</div>
					<div>النوع</div>
					<div>المقاس</div>
					<div>المصنع</div>
					<div>سعر الكيلو</div>
					<div>وزن القطعة</div>
					<div>عدد القطع</div>
					<div>اجمالي الوزن</div>
					<div>اجمالي السعر</div>
					<div>المخزن</div>
					<div></div>
				</Table.Header>

				<Table.Body data={filteredItems} render={(item) => <ItemRow item={item} key={item.id} />} />
			</Table>
		</Menus>
	);
}

export default ItemTable;
