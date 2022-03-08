import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPolicyList } from "../../redux/actions/PolicyActions";
//import setAPIList from "../../redux/reducers/APIs/APIListState";
import RenderList from "../../shared/RenderList";
//import setAPIList from "../../redux/reducers/APIs/APIListState";

function Policies() {
  const dispatch = useDispatch();
  const PolicyList = useSelector((state) => state.setPolicyList);
  useEffect(() => {
    dispatch({ type: "POLICY_LOADING" });
    console.log("dispatch of loading", PolicyList);
    mainCall();
  }, []);

  const mainCall = () => {
    // getAPIList().then((res) => {
    //   console.log("in api List", res.payload.Data.Apis);
    //   dispatch(res);
    //   console.log("main call", ApiList);
    // });
    try {
      getPolicyList().then((res) => {
        console.log("in Policy List", res.payload.Data);
        dispatch(res);
        console.log("main call", PolicyList);
      });
    } catch (err) {
      console.log(err);
    }
  };

  // const renderTenant = (val) => {
  //   setTenant(val);
  // };
  //Iterable function
  function isIterable(obj) {
    // checks for null and undefined
    if (obj == null) {
      return false;
    }
    return typeof obj[Symbol.iterator] === "function";
  }
  console.log("policylist", PolicyList);
  console.log("policyList before datalist", isIterable(PolicyList.list));
  const actions = [
    {
      className: "btn btn-sm btn-success",
      iconClassName: "mdi mdi-sync",
    },
    {
      className: "btn btn-sm btn-danger",
      iconClassName: "mdi mdi-delete",
    },
    {
      className: "btn btn-sm btn-dark",
      iconClassName: "mdi mdi-cog",
    },
  ];
  const datalist = {
    //list: [...PolicyList.list],
    list: [isIterable(PolicyList.list) === true ? PolicyList.list[0] : {}],
    fields: ["Status", "PolicyName", "AccessRights", "AuthType"],
  };
  const headings = [
    { title: "State" },
    { title: "Policy Name", className: "w-100" },
    { title: "Access Rights", className: "text-center" },
    { title: "Authentication Type", className: "text-center" },
    { title: "Action", className: "text-center" },
  ];
  return (
    <>
      <div className="col-lg-12 grid-margin stretch-card">
        <div className="card">
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-around">
              <div className="search-field col-lg-12">
                <form className="h-50">
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control bg-parent border-1"
                      placeholder="Search projects"
                    />
                    <button className=" btn  btn-success btn-sm">
                      <i className=" mdi mdi-magnify"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="table-responsive">
              {PolicyList.loading ? (
                <span>We are loading</span>
              ) : (
                <RenderList
                  headings={headings}
                  data={datalist}
                  actions={actions}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Policies;
