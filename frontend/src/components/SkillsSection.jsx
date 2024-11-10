import { X } from "lucide-react";
import { useState } from "react";
import { SiJavascript } from "react-icons/si";
import { SiReact } from "react-icons/si";
import { SiNodedotjs } from "react-icons/si";
import { SiCss3 } from "react-icons/si";
import { SiHtml5 } from "react-icons/si";
import {  SiPython,} from "react-icons/si";
import { SiCplusplus } from "react-icons/si";

import { SiPhp } from "react-icons/si";
import { SiTypescript } from "react-icons/si";
import {  SiArduino  } from "react-icons/si";

   
  
  
  
 
  



// Sample skill-to-icon mapping (using Lucide icons)
const skillIcons = {
	JavaScript: <SiJavascript className="text-yellow-300 text-5xl" />,
	React: <SiReact className="text-blue-500 text-5xl" />,
	NodeJS: <SiNodedotjs className="text-green-500 text-5xl" />,
    HTML: <SiHtml5 className="text-orange-500 text-5xl" />,
    CSS: <SiCss3 className="text-blue-400 text-5xl" />,
    Python: <SiPython className="text-green-600 text-5xl" />,
    CPlusPlus: <SiCplusplus className="text-blue-600 text-5xl" />,

    PHP: <SiPhp className="text-indigo-600 text-5xl" />,
    TypeScript: <SiTypescript className="text-blue-600 text-5xl" />,
    Arduino: <SiArduino className="text-teal-500 text-5xl" />,


	
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
			<div className='flex flex-wrap py-6 '>
				{/* <IoLogoJavascript className="text-yellow-500" /> */}

				{skills.map((skill, index) => (
					<span
						key={index}
						className=' text-gray-700 px-3 py-1 text-sm mr-2 mb-2 flex items-center flex-col gap-2 hover:scale-110 transition-all duration-300 '
					>

						{skillIcons[skill] && <span className='mr-1'>{skillIcons[skill]}</span>}
						<span className="text-gray-500 font-medium text-md">
							{skill}
							</span>
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
						className='flex-grow p-3 border rounded-l-lg focus:outline-none focus:ring focus:ring-primary transition duration-200'
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
