import { Link } from "react-router-dom";

function UserCard({ user, isConnection }) {
	return (
		<div className='bg-white rounded-lg shadow-md p-4 flex flex-col items-center transition-transform transform hover:scale-105'>
			<Link to={`/profile/${user.username}`} className='flex flex-col items-center'>
				<img
					src={user.profilePicture || "/avatar.png"}
					alt={user.name}
					className='w-24 h-24 rounded-full object-cover mb-4 border-2 border-gray-200 shadow-sm'
				/>
				<h3 className='font-semibold text-lg text-center text-gray-800'>{user.name}</h3>
			</Link>
			<p className='text-gray-600 text-center'>{user.headline}</p>
			<p className='text-sm text-gray-500 mt-2'>{user.connections?.length} connections</p>
			<button className={`mt-4 px-4 py-2 rounded-md text-black w-full transition-all duration-300 ease-in-out ${isConnection ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#D281FE] hover:bg-[#B36EDC] shadow-lg transform hover:scale-105'}`}>
				{isConnection ? "Connected" : "Connect"}
			</button>
		</div>
	);
}

export default UserCard;
