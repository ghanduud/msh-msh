import Menus from '../../components/Menus';
import Table from '../../components/Table';
import Spinner from '../../components/Spinner';
import Empty from '../../components/Empty';

import { useItems } from './useItems';
import ItemRow from './ItemRow';

import { useSelector } from 'react-redux';

function ItemTable() {
	const { isLoading, items } = useItems();

	const {
		categoryFilter,
		inventoryFilter,
		sizeFilter,
		typeFilter,
		standerdFilter,
		manufactureFilter,
		materialFilter,
		hideZeros,
		sortNumbers,
	} = useSelector((store) => store.filter);

	if (isLoading) return <Spinner />;
	if (!items?.length) return <Empty resourceName='بضائع' />;

	let filteredItems = [...items];

	if (categoryFilter !== '')
		filteredItems = [...filteredItems.filter((item) => item.category === categoryFilter)];
	if (inventoryFilter !== '')
		filteredItems = [...filteredItems.filter((item) => item.inventoryLocation === inventoryFilter)];
	if (sizeFilter !== '') filteredItems = [...filteredItems.filter((item) => item.size === sizeFilter)];
	if (typeFilter !== '') filteredItems = [...filteredItems.filter((item) => item.type === typeFilter)];
	if (standerdFilter !== '')
		filteredItems = [...filteredItems.filter((item) => item.standerd === standerdFilter)];
	if (manufactureFilter !== '')
		filteredItems = [...filteredItems.filter((item) => item.manufacture === manufactureFilter)];
	if (materialFilter !== '')
		filteredItems = [...filteredItems.filter((item) => item.material === materialFilter)];

	// If hideZeros is true, filter out items with numberOfPieces equal to zero
	if (hideZeros) {
		filteredItems = filteredItems.filter((item) => item.numberOfPieces !== 0);
	}

	filteredItems.sort((a, b) => {
		const aComponents = a.id.split('-').map(Number);
		const bComponents = b.id.split('-').map(Number);

		for (let i = 0; i < aComponents.length; i++) {
			if (aComponents[i] < bComponents[i]) return -1;
			if (aComponents[i] > bComponents[i]) return 1;
		}
		return 0;
	});

	// Sort the items based on sortNumbers and numberOfPieces
	if (sortNumbers === 'asc') {
		filteredItems.sort((a, b) => a.numberOfPieces - b.numberOfPieces);
	} else if (sortNumbers === 'dec') {
		filteredItems.sort((a, b) => b.numberOfPieces - a.numberOfPieces);
	} else {
		// Default sorting logic if sortNumbers is not 'asc' or 'dec'
		filteredItems.sort((a, b) => {
			const aComponents = a.id.split('-').map(Number);
			const bComponents = b.id.split('-').map(Number);

			for (let i = 0; i < aComponents.length; i++) {
				if (aComponents[i] < bComponents[i]) return -1;
				if (aComponents[i] > bComponents[i]) return 1;
			}
			return 0;
		});
	}

	return (
		<Menus>
			<Table columns='0.8fr 0.8fr 1fr .5fr 1.2fr 0.8fr .8fr .8fr .8fr .8fr 0.8fr 0.1fr'>
				<Table.Header>
					<div>الصنف</div>
					<div>النوع</div>
					<div>المقاس</div>
					<div>الخامة</div>
					<div>المعيار</div>
					<div>المصنع</div>
					<div>وزن القطعة</div>
					<div>عدد القطع</div>
					<div>اجمالي الوزن</div>
					<div>ملاحظات</div>
					<div>المخزن</div>
					<div></div>
				</Table.Header>

				<Table.Body data={filteredItems} render={(item) => <ItemRow item={item} key={item.id} />} />
			</Table>
		</Menus>
	);
}

export default ItemTable;
