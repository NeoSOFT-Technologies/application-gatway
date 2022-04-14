import React from "react";
import { useAppSelector } from "../../../../../../store/hooks";
import GlobalLimit from "../../../../common-settings/global-limit/GlobalLimit";
import AccessList from "./api-access-rights/AccessList";
import ApiAccess from "./api-access/ApiAccess";

export default function ChooseApi() {
  const state = useAppSelector((RootState) => RootState.createKeyState);
  // console.log(state.data.form.accessRights?.length);
  console.log("parent states", state.data.form);
  return (
    <div>
      <h4>Choose Api</h4>
      <AccessList />
      <GlobalLimit
        isDisabled={true}
        policyId="e9420aa1-eec5-4dfc-8ddf-2bc989a9a47f"
      />
      <ApiAccess />
      {/* <GlobalLimit /> */}
      {/* <ApiAccess /> */}

      {state.data.form.accessRights?.length! > 0 ? <ApiAccess /> : <></>}
    </div>
  );
}
