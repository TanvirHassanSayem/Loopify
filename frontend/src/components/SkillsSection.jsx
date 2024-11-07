import { X } from "lucide-react";
import { useState } from "react";

// Sample skill-to-icon mapping (using Lucide icons)
const skillIcons = {
	JavaScript: <span className="text-yellow-500"><i className="devicon-javascript-plain colored" title="JavaScript" /></span>,
	React: <span className="text-blue-500"><i className="devicon-react-original colored" title="React" /></span>,
	NodeJS: <span className="text-green-500"><i className="devicon-nodejs-plain colored" title="Node.js" /></span>,
	CSS: <span className="text-blue-400"><i className="devicon-css3-plain colored" title="CSS3" /></span>,
	HTML: <span className="text-orange-500"><i className="devicon-html5-plain colored" title="HTML5" /></span>,
	// Add more skills and their icons here
};

const SkillsSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [skills, setSkills] = useState(userData.skills || []);
	const [newSkill, setNewSkill] = useState("");

	const handleAddSkill = () => {
		if (newSkill && !skills.includes(newSkill)) {
			setSkills([...skills, newSkill]);
			setNewSkill("");
		}
	};

	const handleDeleteSkill = (skill) => {
		setSkills(skills.filter((s) => s !== skill));
	};

	const handleSave = () => {
		onSave({ skills });
		setIsEditing(false);
	};

	const availableSkills = Object.keys(skillIcons);

	return (
		<div className='bg-white shadow-lg rounded-lg p-6 mb-6 transition-transform hover:scale-105 duration-300 border-l-4 border-primary'>
			<h2 className='text-2xl font-semibold mb-4 text-gray-800'>Skills</h2>
			<div className='flex flex-wrap'>
				{skills.map((skill, index) => (
					<span
						key={index}
						className='bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm mr-2 mb-2 flex items-center'
					>
						{skillIcons[skill] && <span className='mr-1'>{skillIcons[skill]}</span>}
						{skill}
						{isEditing && (
							<button onClick={() => handleDeleteSkill(skill)} className='ml-2 text-red-500 hover:text-red-700'>
								<X size={14} />
							</button>
						)}
					</span>
				))}
			</div>

			{isEditing && (
				<div className='mt-4 flex'>
					<select
						value={newSkill}
						onChange={(e) => setNewSkill(e.target.value)}
						className='flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring focus:ring-primary transition duration-200'
					>
						<option value="">Select a Skill</option>
						{availableSkills.map((skill) => (
							<option key={skill} value={skill}>
								{skill}
							</option>
						))}
					</select>
					<button
						onClick={handleAddSkill}
						className='bg-primary text-white py-2 px-4 rounded-r-lg hover:bg-primary-dark transition duration-300'
					>
						Add Skill
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
							Edit Skills
						</button>
					)}
				</>
			)}
		</div>
	);
};

export default SkillsSection;
