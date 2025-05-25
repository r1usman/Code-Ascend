import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { Link } from "react-router-dom"; // Link is imported but not used in this component.
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserStart,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from '../redux/user/userSlice'; // Assuming this path is correct

// Placeholder for an icon, e.g., from lucide-react or heroicons
const CameraIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white"
  >
    <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
    <circle cx="12" cy="13" r="3" />
  </svg>
);

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0); // For upload progress, if you implement it
  const [uploading, setUploading] = useState(false); // To show uploading state
  const [fileUploadError, setFileUploadError] = useState(null); // Changed to null initial state
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = async (file) => {
    setUploading(true);
    setFileUploadError(null); // Reset error on new upload
    // Simulate upload progress for demo
    // In a real app, use Firebase storage or similar to get actual progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setFilePerc(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setUploading(false);
        // Simulate success or error
        const isSuccess = Math.random() > 0.2; // 80% chance of success
        if (isSuccess) {
          // Assuming the upload returns a URL for the avatar
          const newAvatarUrl = URL.createObjectURL(file); // Placeholder for actual URL
          setFormData({ ...formData, avatar: newAvatarUrl });
          setFileUploadError(null);
        } else {
          setFileUploadError('Image upload failed (max 2MB, type image).');
          setFile(undefined); // Clear the file if upload failed
        }
        setFilePerc(0); // Reset progress
      }
    }, 200);
  };

  const handleChange = (e) => {
    setUpdateSuccess(false); // Clear success message on new change
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0 && !file) {
      // If neither form data nor file has changed, don't submit
      // You might want to show a message here
      return;
    }
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        setUpdateSuccess(false);
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      setFile(undefined); // Clear file after successful update if it was part of formData
      // No need to clear formData if it's reflecting Redux state,
      // but if it's local, you might clear it or parts of it.
    } catch (err) {
      dispatch(updateUserFailure(err.message));
      setUpdateSuccess(false);
    }
  };

  const handleDeleteUser = async () => {
    // Add a confirmation dialog here in a real app
    // e.g., if (!window.confirm("Are you sure you want to delete your account?")) return;
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
      // User will be redirected or UI will change based on Redux state update
    } catch (err) {
      dispatch(deleteUserFailure(err.message));
    }
  };

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart()); // Assuming you have this action
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message)); // Or a signOutFailure action
        return;
      }
      dispatch(deleteUserSuccess(data)); // Or a signOutSuccess action that clears user
    } catch (err) {
      dispatch(deleteUserFailure(err.message)); // Or a signOutFailure action
    }
  };

  // Fallback avatar if currentUser or currentUser.avatar is not available
  const avatarSrc =
    formData.avatar ||
    currentUser?.avatar ||
    'https://placehold.co/256x256/374151/E0E0E0?text=User';

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-900 p-4 font-sans">
      <div className="w-full max-w-md rounded-xl bg-slate-800 p-6 text-gray-200 shadow-2xl sm:p-8">
        <h1 className="mb-8 text-center text-3xl font-bold text-white">
          My Profile
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload Section */}
          <div className="flex flex-col items-center space-y-3">
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />
            <div
              onClick={() => fileRef.current.click()}
              className="group relative cursor-pointer"
            >
              <img
                src={avatarSrc}
                alt="Profile Avatar"
                className="h-32 w-32 rounded-full border-4 border-slate-700 object-cover transition-colors duration-300 group-hover:border-teal-500"
              />
              <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-50">
                {!uploading && <CameraIcon />}
              </div>
            </div>
            {uploading && (
              <div className="w-full max-w-xs text-center">
                <div className="h-2 overflow-hidden rounded-full bg-slate-700">
                  <div
                    className="h-full bg-teal-500 transition-all duration-300"
                    style={{ width: `${filePerc}%` }}
                  ></div>
                </div>
                <p className="mt-1 text-xs text-teal-400">{`Uploading: ${filePerc}%`}</p>
              </div>
            )}
            {fileUploadError && (
              <p className="mt-1 text-center text-xs text-red-400">
                {fileUploadError}
              </p>
            )}
            {!uploading && !fileUploadError && file && formData.avatar && (
              <p className="mt-1 text-center text-xs text-green-400">
                Image selected. Click update to save.
              </p>
            )}
          </div>

          {/* Username Input */}
          <div>
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-medium text-gray-400"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Your username"
              defaultValue={currentUser?.username}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-gray-200 placeholder-gray-500 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="mb-1 block text-sm font-medium text-gray-400"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="your.email@example.com"
              defaultValue={currentUser?.email}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-gray-200 placeholder-gray-500 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-400"
            >
              New Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Leave blank to keep current"
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-600 bg-slate-700 p-3 text-gray-200 placeholder-gray-500 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || uploading}
            className="w-full rounded-lg bg-teal-600 p-3 font-semibold text-white transition-colors duration-300 hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:ring-offset-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? 'Updating...'
              : uploading
              ? 'Processing Image...'
              : 'Update Profile'}
          </button>
        </form>

        {/* Action Links */}
        <div className="mt-6 flex justify-between text-sm">
          <span
            onClick={handleDeleteUser}
            className="cursor-pointer text-red-500 transition-colors hover:text-red-400 hover:underline"
          >
            Delete Account
          </span>
          <span
            onClick={handleSignOut}
            className="cursor-pointer text-amber-500 transition-colors hover:text-amber-400 hover:underline"
          >
            Sign Out
          </span>
        </div>

        {/* Feedback Messages */}
        {error && (
          <p className="mt-4 rounded-md bg-red-900 bg-opacity-30 p-3 text-center text-sm text-red-400">
            {error}
          </p>
        )}
        {updateSuccess && (
          <p className="mt-4 rounded-md bg-green-900 bg-opacity-30 p-3 text-center text-sm text-green-400">
            Profile updated successfully!
          </p>
        )}
      </div>
    </div>
  );
}
