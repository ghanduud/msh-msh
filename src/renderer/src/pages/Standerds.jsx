import Heading from '../components/Heading';
import Row from '../components/Row';

import AddStanderd from '../features/standerd/AddStanderd';
import StanderdsTable from '../features/standerd/StanderdsTable';

function Types() {
	return (
		<>
			<Row type='horizontal'>
				<Heading as='h1'>المعايير</Heading>
			</Row>

			<Row>
				<StanderdsTable />
				<AddStanderd />
			</Row>
		</>
	);
}

export default Types;
