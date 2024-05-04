import Modal from '../../components/Modal';
import Button from '../../components/Button';
import CreateUpdateSizeForm from './CreateUpdateSizeForm';

function AddSize() {
	return (
		<div>
			<Modal>
				<Modal.Open opens='size-form'>
					<Button>اضافة مقاس جديد</Button>
				</Modal.Open>
				<Modal.Window name='size-form'>
					<CreateUpdateSizeForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

export default AddSize;
