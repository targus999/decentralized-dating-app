import React, { useState } from "react";
import Modal from "react-modal";
import "./signIn.css"; // Import modal-specific styles

// Set the root element for the modal (for accessibility)
Modal.setAppElement("#root");

const SignIn = ({ isOpen, closeModal }) => {
    const [formData, setFormData] = useState({
        name: "",
        age: "",
        description: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    const handleImageChange = (event) => {
        const file = event.target.files[0]; // Get the selected file
        setFormData((prevData) => ({
            ...prevData,
            image: file, // Store the image file
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        closeModal(); // Close the modal after submission
    };

    return (
        <Modal
            isOpen={isOpen}
            contentLabel="Form Modal"
            className="modal"
            overlayClassName="modal-overlay"
        >
            <div className="modal-content">
                <h2>Register Yourself</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                        required
                    />
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Age"
                        required
                    />
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        required
                        placeholder="Select Gender"
                    >
                        <option value="" disabled selected>Select Gender</option>
                        <option value="0">Male</option>
                        <option value="1">Female</option>
                        <option value="2">Other</option>
                    </select>
                    <div className="image-upload-container">
                        <input
                            type="file"
                            name="image"
                            onChange={handleImageChange}
                            accept="image/*"  /* Accept only image files */
                        />
                        <small className="optional-note">Optional: You can upload an image (Max size: 5MB)</small>
                        <small className="optional-note">Image will be saved in IPFS</small>
                    </div>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        required
                    />
                    <div className="button-container ">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={closeModal}>Cancel </button>
                    </div>

                </form>
            </div>
        </Modal>
    );
};

export default SignIn;
