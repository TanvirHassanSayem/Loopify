import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";
import NotificationsPage from "./pages/NotificationsPage";
import NetworkPage from "./pages/NetworkPage";
import PostPage from "./pages/PostPage";
import ProfilePage from "./pages/ProfilePage";
import ChatContextProvider from "./utils/ChatContext";
import Chatting from "./components/Chatting";
function App() {
	const { data: authUser, isLoading } = useQuery({
		queryKey: ["authUser"],
		queryFn: async () => {
			try {
				const res = await axiosInstance.get("/auth/me");
				return res.data;
			} catch (err) {
				if (err.response && err.response.status === 401) {
					return null;
				}
				toast.error(err.response.data.message || "Something went wrong");
			}
		},
	});

	if (isLoading) return null;

	return (
		<ChatContextProvider>

			<Chatting />

			<>


			 
				<dialog id="sharemodal" className="modal">

					<div className="bg-white dark:bg-gray-900 rounded-2xl p-5 shadow-2xl w-64 max-w-full relative transform transition-all duration-300 scale-100 hover:scale-105">
						<button
							className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
							aria-label="Close Modal"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width={18}
								height={18}
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth={2}
								strokeLinecap="round"
								strokeLinejoin="round"
								className="lucide lucide-x"
							>
								<path d="M18 6 6 18" />
								<path d="m6 6 12 12" />
							</svg>
						</button>
						<h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3 text-center">
							Share Post
						</h3>
						<p className="text-gray-600 dark:text-gray-300 mb-5 text-sm text-center">
							Link copied to clipboard!
						</p>


						<form method="dialog">
							<button className="btn w-full py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold hover:from-indigo-600 hover:to-blue-500 transition-colors duration-300">
								Close
							</button>
						</form>



					</div>






				</dialog>
			</>

			<Layout>
				<Routes>
					<Route path='/' element={authUser ? <HomePage /> : <Navigate to={"/login"} />} />
					<Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
					<Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
					<Route path='/notifications' element={authUser ? <NotificationsPage /> : <Navigate to={"/login"} />} />
					<Route path='/network' element={authUser ? <NetworkPage /> : <Navigate to={"/login"} />} />
					<Route path='/post/:postId' element={authUser ? <PostPage /> : <Navigate to={"/login"} />} />
					<Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />} />
				</Routes>
				<Toaster />
			</Layout>
		</ChatContextProvider>
	);
}

export default App;
