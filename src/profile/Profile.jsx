import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext, useUser } from '../GlobalContextApi/User';
import UploadImage from '../Authentication/Components/UploadImage';
import axios from 'axios';
// import { Link } from "react-router-dom"; // Link is imported but not used in this component.

// Placeholder for an icon, e.g., from lucide-react or heroicons

export default function Profile() {
  const fileRef = useRef(null);

  const User = useUser();

  //   const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0); // For upload progress, if you implement it
  const [uploading, setUploading] = useState(false); // To show uploading state
  const [fileUploadError, setFileUploadError] = useState(null); // Changed to null initial state
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    async function Uploadasync() {
      if (file) {
        const abc = await UploadImage(file);
        console.log('File upload completed:', abc.Image);
        setFormData({
          ...formData,
          profileImage: abc.Image || '',
        });
      }
    }
    Uploadasync();
  }, [file]);
  if (!User) return null;
  const { User: currentUser, loading, error } = User;
  const handleChange = (e) => {
    setUpdateSuccess(false);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0 && !file) {
      return;
    }
    try {
      console.log('Submitting form data:', formData);
      //   dispatch(updateUserStart());
      const res = await fetch(
        `http://localhost:3000/api/Auth/update/${currentUser._id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        // dispatch(updateUserFailure(data.message));
        setUpdateSuccess(false);
        return;
      }
      //   dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
      setFile(undefined);
    } catch (err) {
      //   dispatch(updateUserFailure(err.message));
      setUpdateSuccess(false);
    }
  };

  const avatarSrc =
    formData.profileImage ||
    currentUser?.profileImage ||
    'https://placehold.co/256x256/374151/E0E0E0?text=User';

  return (
    <div className="flex min-h-screen items-center justify-center bg-dark-bg-secondary4 p-4 font-sans">
      <div className="w-full max-w-md rounded-xl  bg-[#141414] p-6 text-gray-200 shadow-2xl sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Avatar Upload Section */}
          <div className="flex cursor-pointer flex-col items-center space-y-3">
            <input
              onChange={(e) => setFile(e.target.files[0])}
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
            />

            <img
              src={avatarSrc}
              onClick={() => fileRef.current.click()}
              alt="Profile Avatar"
              className="z-10 h-32 w-32 rounded-full border-4 border-slate-700 object-cover transition-colors duration-300 group-hover:border-teal-500"
            />

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
            {!uploading &&
              !fileUploadError &&
              file &&
              formData.profileImage && (
                <p className="mt-1 text-center text-xs text-green-400">
                  Image selected. Click update to save.
                </p>
              )}
          </div>

          {/* Username Input */}
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-400"
            >
              Username
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              defaultValue={currentUser?.name}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-600 bg-dark-bg-secondary2 p-3 text-gray-200 placeholder-gray-500 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
              className="w-full rounded-lg border border-slate-600 bg-dark-bg-secondary2 p-3 text-gray-200 placeholder-gray-500 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
              className="w-full rounded-lg border border-slate-600 bg-dark-bg-secondary2 p-3 text-gray-200 placeholder-gray-500 transition-colors focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
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
