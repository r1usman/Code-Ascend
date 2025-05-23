import ProfileForm from './components/profile/ProfileForm';
import ProfileHeader from './components/profile/ProfileHeader';
import { ProfileProvider } from './context/ProfileContext';

const ProfilePage = () => {
  return (
    <ProfileProvider>
      <div className="flex min-h-screen items-center justify-center bg-gray-900 py-6">
        <div className="container mx-auto max-w-4xl px-4">
          <h1 className="mb-6 text-center text-2xl font-bold sm:text-left">
            Profile Settings
          </h1>

          <div className="space-y-6">
            <ProfileHeader />
            <ProfileForm />
          </div>
        </div>
      </div>
    </ProfileProvider>
  );
};

export default ProfilePage;
