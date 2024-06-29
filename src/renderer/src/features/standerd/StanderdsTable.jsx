import Empty from '../../components/Empty';
import Menus from '../../components/Menus';
import Spinner from '../../components/Spinner';
import Table from '../../components/Table';
import StanderdRow from './StanderdRow';

import { useStanderd } from './useStanderd';

function StanderdsTable() {
	const { isLoading, standerds } = useStanderd();

	if (isLoading) return <Spinner />;
	if (!standerds?.length) return <Empty resourceName='معايير' />;

	return (
		<Menus>
			<Table columns='1fr 0.1fr'>
				<Table.Header>
					<div>الاسم</div>
					<div></div>
				</Table.Header>

				<Table.Body
					data={standerds}
					render={(standerd) => <StanderdRow standerd={standerd} key={standerd.id} />}
				/>
			</Table>
		</Menus>
	);
}

export default StanderdsTable;
