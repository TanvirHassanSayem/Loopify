import { Briefcase, X } from "lucide-react";
import { useState } from "react";
import { formatDate } from "../utils/dateUtils";

const ExperienceSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [experiences, setExperiences] = useState(userData.experience || []);
	const [newExperience, setNewExperience] = useState({
		title: "",
		company: "",
		startDate: "",
		endDate: "",
		description: "",
		currentlyWorking: false,
	});

	const handleAddExperience = () => {
		if (newExperience.title && newExperience.company && newExperience.startDate) {
			setExperiences([...experiences, { ...newExperience, _id: Date.now() }]);

			setNewExperience({
				title: "",
				company: "",
				startDate: "",
				endDate: "",
				description: "",
				currentlyWorking: false,
			});
		}
	};

	const handleDeleteExperience = (id) => {
		setExperiences(experiences.filter((exp) => exp._id !== id));
	};

	const handleSave = () => {
		onSave({ experience: experiences });
		setIsEditing(false);
	};

	const handleCurrentlyWorkingChange = (e) => {
		setNewExperience({
			...newExperience,
			currentlyWorking: e.target.checked,
			endDate: e.target.checked ? "" : newExperience.endDate,
		});
	};

	return (
		<div className='bg-white shadow-lg rounded-lg p-6 mb-6 transition-transform hover:scale-105 duration-300 border-l-4 border-primary'>
			<h2 className='text-2xl font-semibold mb-4 text-gray-800'>Experience</h2>
			{experiences.map((exp) => (
				<div key={exp._id} className='mb-4 flex justify-between items-start'>
					<div className='flex items-start'>
						<Briefcase size={20} className='mr-2 mt-1 text-primary' />
						<div>
							<h3 className='font-semibold text-lg'>{exp.title}</h3>
							<p className='text-gray-600'>{exp.company}</p>
							<p className='text-gray-500 text-sm'>
								{formatDate(exp.startDate)} - {exp.endDate ? formatDate(exp.endDate) : "Present"}
							</p>
							<p className='text-gray-700'>{exp.description}</p>
						</div>
					</div>
					{isEditing && (
						<button onClick={() => handleDeleteExperience(exp._id)} className='text-red-500 hover:text-red-700'>
							<X size={20} />
						</button>
					)}
				</div>
			))}

			{isEditing && (
				<div className='mt-4'>
					<input
						type='text'
						placeholder='Title'
						value={newExperience.title}
						onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
						className='w-full p-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring focus:ring-primary transition duration-200'
					/>
					<input
						type='text'
						placeholder='Company'
						value={newExperience.company}
						onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
						className='w-full p-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring focus:ring-primary transition duration-200'
					/>
					<input
						type='date'
						value={newExperience.startDate}
						onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
						className='w-full p-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring focus:ring-primary transition duration-200'
					/>
					<div className='flex items-center mb-2'>
						<input
							type='checkbox'
							id='currentlyWorking'
							checked={newExperience.currentlyWorking}
							onChange={handleCurrentlyWorkingChange}
							className='mr-2'
						/>
						<label htmlFor='currentlyWorking'>I currently work here</label>
					</div>
					{!newExperience.currentlyWorking && (
						<input
							type='date'
							value={newExperience.endDate}
							onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
							className='w-full p-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring focus:ring-primary transition duration-200'
						/>
					)}
					<textarea
						placeholder='Description'
						value={newExperience.description}
						onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
						className='w-full p-3 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring focus:ring-primary transition duration-200'
					/>
					<button
						onClick={handleAddExperience}
						className='bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition duration-300'
					>
						Add Experience
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
							Edit Experiences
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default ExperienceSection;
