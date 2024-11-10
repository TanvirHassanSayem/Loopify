import { School, X } from "lucide-react";
import { useState } from "react";

const EducationSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [educations, setEducations] = useState(userData.education || []);
	const [newEducation, setNewEducation] = useState({
		school: "",
		fieldOfStudy: "",
		startYear: "",
		endYear: "",
	});

	const handleAddEducation = () => {
		if (newEducation.school && newEducation.fieldOfStudy && newEducation.startYear) {
			setEducations([...educations, { ...newEducation, _id: Date.now() }]);
			setNewEducation({
				school: "",
				fieldOfStudy: "",
				startYear: "",
				endYear: "",
			});
		}
	};

	const handleDeleteEducation = (id) => {
		setEducations(educations.filter((edu) => edu._id !== id));
	};

	const handleSave = () => {
		onSave({ education: educations });
		setIsEditing(false);
	};

	return (
		<div className='bg-white shadow-lg rounded-lg p-6 mb-6 transition-transform hover:scale-105 duration-300 border-l-4 border-primary'>
			<h2 className='text-2xl font-semibold mb-4 text-gray-800'>Education</h2>
			{educations.map((edu) => (
				<div key={edu._id} className='mb-4 flex justify-between items-start'>
					<div className='flex items-start'>
						<School size={20} className='mr-2 mt-1 text-primary' />
						<div>
							<h3 className='font-semibold text-lg'>{edu.fieldOfStudy}</h3>
							<p className='text-gray-600'>{edu.school}</p>
							<p className='text-gray-500 text-sm'>
								{edu.startYear} - {edu.endYear || "Present"}
							</p>
						</div>
					</div>
					{isEditing && (
						<button onClick={() => handleDeleteEducation(edu._id)} className='text-red-500 hover:text-red-700'>
							<X size={20} />
						</button>
					)}
				</div>
			))}
			{isEditing && (
				<div className='mt-4'>
					<input
						type='text'
						placeholder='School'
						value={newEducation.school}
						onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
						className='w-full p-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring focus:ring-primary transition duration-200'
					/>
					<input
						type='text'
						placeholder='Field of Study'
						value={newEducation.fieldOfStudy}
						onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })}
						className='w-full p-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring focus:ring-primary transition duration-200'
					/>
					<input
						type='number'
						placeholder='Start Year'
						value={newEducation.startYear}
						onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
						className='w-full p-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring focus:ring-primary transition duration-200'
					/>
					<input
						type='number'
						placeholder='End Year (optional)'
						value={newEducation.endYear}
						onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
						className='w-full p-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring focus:ring-primary transition duration-200'
					/>
					<button
						onClick={handleAddEducation}
						className='bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition duration-300'
					>
						Add Education
					</button>
				</div>
			)}

			{isOwnProfile && (
				<>
					{isEditing ? (
						<div className='flex justify-between mt-4'>
							<button
								onClick={handleSave}
								className='bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition duration-300'
							>
								Save Changes
							</button>
							<button
								onClick={() => setIsEditing(false)}
								className='bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition duration-300'
							>
								Cancel
							</button>
						</div>
					) : (
						<button
							onClick={() => setIsEditing(true)}
							className='mt-4 text-primary hover:text-primary-dark transition duration-300 font-semibold'
						>
							Edit Education
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default EducationSection;
