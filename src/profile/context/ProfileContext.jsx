import { createContext, useContext, useState } from "react";

// Types

// Context
const ProfileContext = createContext();

// Provider
export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState({
    fullName: "Alex Johnson",
    email: "alex.johnson@example.com",
    photoUrl:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
  });

  const [passwordFields, setPasswordFields] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [saving, setSaving] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [errors, setErrors] = useState({});

  const updateProfile = (updates) => {
    // Simulate photo upload if photoUrl is being updated
    if ("photoUrl" in updates) {
      setUploadingPhoto(true);
      setTimeout(() => {
        setUploadingPhoto(false);
        setProfile((prev) => ({ ...prev, ...updates }));
      }, 1000);
    } else {
      setProfile((prev) => ({ ...prev, ...updates }));
    }
  };

  const updatePasswordField = (field, value) => {
    setPasswordFields((prev) => ({ ...prev, [field]: value }));

    // Clear related errors when typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validate personal info
    if (!profile.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!profile.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      newErrors.email = "Email is invalid";
    }

    // Validate password fields only if any password field is filled
    const isChangingPassword =
      passwordFields.currentPassword ||
      passwordFields.newPassword ||
      passwordFields.confirmPassword;

    if (isChangingPassword) {
      if (!passwordFields.currentPassword) {
        newErrors.currentPassword = "Current password is required";
      }

      if (!passwordFields.newPassword) {
        newErrors.newPassword = "New password is required";
      } else if (passwordFields.newPassword.length < 8) {
        newErrors.newPassword = "Password must be at least 8 characters";
      }

      if (!passwordFields.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password";
      } else if (
        passwordFields.newPassword !== passwordFields.confirmPassword
      ) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveProfile = () => {
    if (validateForm()) {
      setSaving(true);

      // Simulate API call
      setTimeout(() => {
        setSaving(false);
        // Reset password fields after successful save
        if (passwordFields.newPassword) {
          setPasswordFields({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        }
      }, 1500);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        updateProfile,
        saving,
        saveProfile,
        uploadingPhoto,
        errors,
        passwordFields,
        updatePasswordField,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

// Hook
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
