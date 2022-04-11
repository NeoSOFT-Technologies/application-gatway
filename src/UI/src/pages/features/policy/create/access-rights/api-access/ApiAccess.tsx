import React from "react";
import GlobalLimit from "../../../../common-settings-policy/global-limit/GlobalLimit";
import PathBased from "../../../../common-settings-policy/path-based-permission/PathBased";

export default function ApiAccess() {
  return (
    <div>
      <GlobalLimit />
      <PathBased />
    </div>
  );
}
