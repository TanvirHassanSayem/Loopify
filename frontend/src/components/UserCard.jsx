import { Link } from "react-router-dom";

function UserCard({ user, isConnection }) {
	return (
		<div className='bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center transition-transform transform hover:-translate-y-2 hover:shadow-2xl hover:scale-105 duration-300 ease-in-out'>
			<Link to={`/profile/${user.username}`} className='flex flex-col items-center'>
				<img
					src={user.profilePicture || "/avatar.png"}
					alt={user.name}
					className='w-28 h-28 rounded-full object-cover mb-5 border-4 border-[#D3B4FF] shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out'
				/>
				<h3 className='font-bold text-xl text-center text-[#4A3F8C] mb-2 tracking-wide'>
					{user.name}
				</h3>
			</Link>
			<p className='text-gray-600 text-center mb-4 italic'>{user.headline}</p>
			<p className='text-sm text-gray-500 mb-6'>
				{user.connections?.length} connections
			</p>
			<button
				className={`mt-auto px-5 py-3 rounded-lg w-full font-semibold transition-all duration-300 ease-in-out ${
					isConnection
						? 'bg-gray-300 text-gray-700 cursor-not-allowed'
						: 'bg-[#804FEF] text-white hover:bg-[#6939CC] shadow-md hover:shadow-xl transform hover:scale-105'
				}`}
			>
				{isConnection ? 'Connected' : 'Connect'}
			</button>
		</div>
	);
}

export default UserCard;
