import Modal from '../../components/Modal';
import Button from '../../components/Button';
import CreateItemForm from './CreateItemForm';

function AddItem() {
	return (
		<div>
			<Modal>
				<Modal.Open opens='item-form'>
					<Button>اضافة بضائع جديدة</Button>
				</Modal.Open>
				<Modal.Window name='item-form'>
					<CreateItemForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

export default AddItem;
