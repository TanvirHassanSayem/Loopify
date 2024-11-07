import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";

const LoginForm = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const queryClient = useQueryClient();

	const { mutate: loginMutation, isLoading } = useMutation({
		mutationFn: (userData) => axiosInstance.post("/auth/login", userData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
			toast.success("Successfully Logged In");
		},
		onError: (err) => {
			toast.error(err.response?.data?.message || "Something went wrong");
		},
	});

	const handleSubmit = (e) => {
		e.preventDefault();
		loginMutation({ username, password });
	};

	return (
		<form onSubmit={handleSubmit} className='space-y-6 w-full max-w-md bg-secondary p-6 rounded-lg shadow-lg transition-all duration-300'>
			<h2 className='text-2xl font-semibold text-center text-primary'>Login</h2>
			<input
				type='text'
				placeholder='Username'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				className='input input-bordered w-full p-4 text-base rounded-lg transition duration-300 focus:ring focus:ring-primary focus:outline-none'
				required
			/>
			<input
				type='password'
				placeholder='Password'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className='input input-bordered w-full p-4 text-base rounded-lg transition duration-300 focus:ring focus:ring-primary focus:outline-none'
				required
			/>
			<button
				type='submit'
				className='bg-primary text-white w-full text-lg rounded-lg py-3 hover:bg-primary-dark transition-colors duration-300 shadow-md'
				disabled={isLoading}
			>
				{isLoading ? <Loader className='size-5 animate-spin' /> : "Login"}
			</button>
		</form>
	);
};

export default LoginForm;
