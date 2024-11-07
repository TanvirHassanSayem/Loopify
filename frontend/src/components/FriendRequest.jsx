import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const FriendRequest = ({ request }) => {
  const queryClient = useQueryClient();

  const { mutate: acceptConnectionRequest } = useMutation({
    mutationFn: (requestId) => axiosInstance.put(`/connections/accept/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request accepted");
      queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  const { mutate: rejectConnectionRequest } = useMutation({
    mutationFn: (requestId) => axiosInstance.put(`/connections/reject/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request rejected");
      queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
    },
    onError: (error) => {
      toast.error(error.response.data.error);
    },
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 flex items-center justify-between gap-6 transition-transform transform hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/40">
      <div className="flex items-center gap-6">
        <Link to={`/profile/${request.sender.username}`}>
          <img
            src={request.sender.profilePicture || "/avatar.png"}
            alt={request.sender.name}
            className="w-16 h-16 rounded-full object-cover border-4 border-transparent hover:border-primary transition-all"
          />
        </Link>

        <div>
          <Link to={`/profile/${request.sender.username}`} className="font-semibold text-2xl text-gray-900 dark:text-gray-100 hover:underline transition-all">
            {request.sender.name}
          </Link>
          <p className="text-gray-500 dark:text-gray-400 text-lg mt-1">{request.sender.headline}</p>
        </div>
      </div>

      <div className="space-x-3 flex-shrink-0">
        <button
          className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-6 py-2 rounded-md shadow-lg hover:from-indigo-400 hover:via-purple-400 hover:to-pink-400 transition-all ease-in-out duration-200 transform hover:scale-105"
          onClick={() => acceptConnectionRequest(request._id)}
        >
          Accept
        </button>
        <button
          className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-6 py-2 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-all ease-in-out duration-200 transform hover:scale-105"
          onClick={() => rejectConnectionRequest(request._id)}
        >
          Reject
        </button>
      </div>
    </div>
  );
};

export default FriendRequest;
