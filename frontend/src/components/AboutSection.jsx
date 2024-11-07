import { useState } from "react";

const AboutSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [about, setAbout] = useState(userData.about || "");

	const handleSave = () => {
		setIsEditing(false);
		onSave({ about });
	};

	return (
		<div className='bg-white shadow-lg rounded-lg p-6 mb-6 transition-transform hover:scale-105 duration-300 border-l-4 border-primary'>
			<h2 className='text-2xl font-semibold mb-4 text-gray-800'>About</h2>
			{isOwnProfile && (
				<>
					{isEditing ? (
						<>
							<textarea
								value={about}
								onChange={(e) => setAbout(e.target.value)}
								className='w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-primary transition duration-200'
								rows='4'
								placeholder='Tell us about yourself...'
							/>
							<div className='flex justify-end mt-4'>
								<button
									onClick={handleSave}
									className='bg-primary text-white py-2 px-4 rounded-lg shadow hover:bg-primary-dark transition duration-300 mr-2'
								>
									Save
								</button>
								<button
									onClick={() => setIsEditing(false)}
									className='bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300'
								>
									Cancel
								</button>
							</div>
						</>
					) : (
						<>
							<p className='text-gray-600 mb-4'>{userData.about || "No information provided."}</p>
							<button
								onClick={() => setIsEditing(true)}
								className='mt-4 text-primary hover:text-primary-dark transition duration-300 font-semibold'
							>
								Edit
							</button>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default AboutSection;
