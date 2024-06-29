import Modal from '../../components/Modal';
import Button from '../../components/Button';
import CreateUpdateStanderdForm from './CreateUpdateStanderdForm';

function AddStanderd() {
	return (
		<div>
			<Modal>
				<Modal.Open opens='type-form'>
					<Button>اضافة معيار جديد</Button>
				</Modal.Open>
				<Modal.Window name='type-form'>
					<CreateUpdateStanderdForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

export default AddStanderd;
