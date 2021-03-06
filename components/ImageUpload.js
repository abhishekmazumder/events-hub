import { useState } from 'react';
import { API_URL } from '@/config/index';
import styles from '@/styles/Form.module.css';

const ImageUpload = ({ evtId, imageUploaded }) => {
	const [image, setImage] = useState(null);

	const handleFileChange = e => {
		setImage(e.target.files[0]);
	};

	const handleSubmit = async e => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('files', image);
		formData.append('ref', 'events');
		formData.append('refId', evtId);
		formData.append('field', 'image');

		const res = await fetch(`${API_URL}/upload`, {
			method: 'POST',
			body: formData,
		});

		if (res.ok) {
			imageUploaded();
		}
	};

	return (
		<div className={styles.form}>
			<h1>Upload Image</h1>
			<form onSubmit={handleSubmit}>
				<div className={styles.file}>
					<input type="file" onChange={handleFileChange} />
				</div>
				<input type="submit" value="Upload Image" className="btn" />
			</form>
		</div>
	);
};

export default ImageUpload;
