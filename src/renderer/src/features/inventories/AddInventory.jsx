import Modal from '../../components/Modal';
import Button from '../../components/Button';
import CreateUpdateInventoryForm from './CreateUpdateInventoryForm';

function AddInvetory() {
	return (
		<div>
			<Modal>
				<Modal.Open opens='inventory-form'>
					<Button>اضافة مخزن جديد</Button>
				</Modal.Open>
				<Modal.Window name='inventory-form'>
					<CreateUpdateInventoryForm />
				</Modal.Window>
			</Modal>
		</div>
	);
}

export default AddInvetory;
