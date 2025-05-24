import React from 'react';
import { useProfile } from '../../context/ProfileContext';
import FormSection from '../ui/FormSection';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Save, Loader2 } from 'lucide-react';

const ProfileForm = () => {
  const {
    profile,
    updateProfile,
    saving,
    saveProfile,
    errors,
    passwordFields,
    updatePasswordField,
  } = useProfile();

  const handleSubmit = (e) => {
    e.preventDefault();
    saveProfile();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <FormSection
        title="Personal Information"
        description="Update your personal details"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Full Name"
            id="fullName"
            value={profile.fullName}
            onChange={(e) => updateProfile({ fullName: e.target.value })}
            error={errors.fullName}
          />

          <Input
            label="Email Address"
            id="email"
            type="email"
            value={profile.email}
            onChange={(e) => updateProfile({ email: e.target.value })}
            error={errors.email}
          />
        </div>
      </FormSection>

      {/* Password */}
      <FormSection
        title="Password"
        description="Update your password to secure your account"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <Input
            label="Current Password"
            id="currentPassword"
            type="password"
            value={passwordFields.currentPassword}
            onChange={(e) =>
              updatePasswordField('currentPassword', e.target.value)
            }
            error={errors.currentPassword}
          />

          <Input
            label="New Password"
            id="newPassword"
            type="password"
            value={passwordFields.newPassword}
            onChange={(e) => updatePasswordField('newPassword', e.target.value)}
            error={errors.newPassword}
          />

          <Input
            label="Confirm New Password"
            id="confirmPassword"
            type="password"
            value={passwordFields.confirmPassword}
            onChange={(e) =>
              updatePasswordField('confirmPassword', e.target.value)
            }
            error={errors.confirmPassword}
            className="sm:col-span-2"
          />
        </div>
      </FormSection>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button type="submit" disabled={saving}>
          {saving ? (
            <>
              <Loader2 size={18} className="mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={18} className="mr-2" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
};

export default ProfileForm;
