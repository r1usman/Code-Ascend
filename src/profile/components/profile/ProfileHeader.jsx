import React, { useRef } from 'react';
import { Camera, CheckCircle } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';

const ProfileHeader = () => {
  const fileInputRef = useRef(null);
  const { profile, updateProfile, uploadingPhoto } = useProfile();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        updateProfile({ photoUrl: event.target.result });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="rounded-lg bg-gray-800 p-5 shadow-lg">
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        <div className="group relative">
          <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-gray-700 bg-gray-700">
            {profile.photoUrl ? (
              <img
                src={profile.photoUrl}
                alt="Profile"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-700 text-gray-500">
                <span className="text-3xl font-medium">
                  {profile.fullName
                    ? profile.fullName.charAt(0).toUpperCase()
                    : '?'}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-1.5 shadow-lg transition-all duration-150 hover:bg-blue-700"
            aria-label="Change profile picture"
          >
            <Camera size={16} />
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            accept="image/*"
          />

          {uploadingPhoto && (
            <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50">
              <div className="animate-pulse text-blue-400">
                <CheckCircle size={28} />
              </div>
            </div>
          )}
        </div>

        <div className="text-center sm:text-left">
          <h2 className="mb-1 text-lg font-bold">
            {profile.fullName || 'Your Name'}
          </h2>
          <p className="text-sm text-gray-400">
            {profile.email || 'your.email@example.com'}
          </p>
          <p className="mt-1 text-xs text-gray-500">
            Click the camera icon to update your photo
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
