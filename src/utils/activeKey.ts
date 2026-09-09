const getActiveKeys = (normalizedPath: string): string[] => {
  if (normalizedPath.includes("/user-request")) {
    return ["all-users-request"];
  }
  if (normalizedPath.includes("/edit-profile")) {
    return ["profile"];
  }
  if (normalizedPath.includes("/change-password")) {
    return ["change-password"];
  }
  if (normalizedPath.includes("/terms-of-service-marketplace")) {
    return ["terms-of-service-marketplace"];
  }
  if (normalizedPath.includes("/add-feedback")) {
    return ["add-feedback"];
  }
  if (normalizedPath.includes("/show-feedback")) {
    return ["show-feedback"];
  }
  if (normalizedPath.includes("/terms-and-condition")) {
    return ["terms-and-condition"];
  }

  return [normalizedPath.split("/").pop() || ""]; // Default fallback, ensuring a non-null value is returned
};

export default getActiveKeys;
