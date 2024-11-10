import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
	return (
		<div className='min-h-screen flex flex-col justify-center bg-gradient-to-br from-indigo-100 to-blue-200 py-12 sm:px-6 lg:px-8'>
			<div className='sm:mx-auto sm:w-full sm:max-w-md'>
				
			<div className="flex justify-center items-center py-6">
  <div className="bg-gradient-to-br from-purple-600 to-blue-500 p-1 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-110 hover:rotate-1 hover:shadow-2xl">
    <img
      className="h-24 w-48 md:h-28 md:w-52 rounded-lg border-4 border-white shadow-md transition-transform duration-300 transform hover:scale-105"
      src="/public/Logo.png" // Ensure the path is correct
      alt="Custom Logo"
    />
  </div>
</div>



				<h2 className='text-center text-3xl font-extrabold text-gray-900'>Sign in to your account</h2>
			</div>

			<div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md shadow-lg rounded-lg overflow-hidden'>
				<div className='bg-white py-8 px-6 sm:rounded-lg'>
					<LoginForm />
					<div className='mt-6'>
						<div className='relative'>
							<div className='absolute inset-0 flex items-center'>
								<div className='w-full border-t border-gray-300'></div>
							</div>
							<div className='relative flex justify-center text-sm'>
								<span className='px-2 bg-white text-gray-500'>New to the Site?</span>
							</div>
						</div>
						<div className='mt-6'>
							<Link
								to='/signup'
								className='w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-300'
							>
								Join now
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
