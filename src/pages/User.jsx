import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import axios from "axios";
const defaultUrl = axios.getUri();
const fetchUser = (id) =>
  axios(`/admin/user/${id}`).then((res) => {
    return res.data;
  });
function User() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const suspendmutation = useMutation(() => {
    return axios.patch(`/admin/user/${id}/suspend`);
  });
  const unsuspendmutation = useMutation(() => {
    return axios.patch(`/admin/user/${id}/unsuspend`);
  });
  const { isLoading, isError, data, error } = useQuery(["user", id], () =>
    fetchUser(id)
  );
  if (isLoading || suspendmutation.isLoading || unsuspendmutation.isLoading) {
    return <div>Loaing ....</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }
  if (suspendmutation.isError) {
    return <div>{suspendmutation.error.message}</div>;
  }
  queryClient.invalidateQueries(["user", id]);
  return (
    <div>
      <Header />
      <div>
        <div>
          <div>
            <h1 className="app-page-title">My Account</h1>
            <div className="row gy-4">
              <div>
                <div>
                  <div className="app-card-header p-3 border-bottom-0">
                    <div className="row align-items-center gx-3">
                      <div className="col-auto">
                        <div className="app-icon-holder">
                          <svg
                            width="1em"
                            height="1em"
                            viewBox="0 0 16 16"
                            className="bi bi-person"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm6 5c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"
                            />
                          </svg>
                        </div>
                        {/*//icon-holder*/}
                      </div>
                      {/*//col*/}
                      <div className="col-auto">
                        <h4 className="app-card-title">Profile</h4>
                      </div>
                      {/*//col*/}
                    </div>
                    {/*//row*/}
                  </div>
                  {/*//app-card-header*/}
                  <div className="app-card-body px-4 w-100">
                    <div className="item border-bottom py-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <div className="item-label mb-2">
                            <strong>Photo</strong>
                          </div>
                          <div className="item-data">
                            <img
                              className="profile-image"
                              crossOrigin="anonymous"
                              src={`${defaultUrl}/profile-pic/${data.profilePic}`}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                      {/*//row*/}
                    </div>
                    <div className="item border-bottom py-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <div className="item-label">
                            <strong>Id</strong> {data._id}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="item border-bottom py-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <div className="item-label">
                            <strong>Name</strong>
                          </div>
                          <div className="item-data">
                            {data.firstName} {data.lastName}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/*//item*/}
                    {data?.email ? (
                      <div className="item border-bottom py-3">
                        <div className="row justify-content-between align-items-center">
                          <div className="col-auto">
                            <div className="item-label">
                              <strong>Email</strong>
                            </div>
                            <div className="item-data">{data.email}</div>
                          </div>
                        </div>{" "}
                      </div>
                    ) : null}
                    {data?.skill?.length ? (
                      <div className="item border-bottom py-3">
                        <div className="row justify-content-between align-items-center">
                          <div className="col-auto">
                            <div className="item-label">
                              <strong>Skills</strong>
                            </div>
                            <div className="item-data">
                              {data.skills.map((skill) => {
                                return <p>{skill}</p>;
                              })}
                            </div>
                          </div>
                          {/*//col*/}

                          {/*//col*/}
                        </div>
                        {/*//row*/}
                      </div>
                    ) : null}

                    {/*//item*/}
                    <div className="item border-bottom py-3">
                      <div className="row justify-content-between align-items-center">
                        <div className="col-auto">
                          <div className="item-label">
                            <strong>Location</strong>
                          </div>
                          <div className="item-data">New York</div>
                        </div>
                        {/*//col*/}
                        <div className="col text-end">
                          <a className="btn-sm app-btn-secondary" href="#">
                            Change
                          </a>
                        </div>
                        {/*//col*/}
                      </div>
                      {/*//row*/}
                    </div>
                    {/*//item*/}
                  </div>
                  {/*//app-card-body*/}
                  <div className="app-card-footer p-4 mt-auto">
                    {data.suspended ? (
                      <button
                        style={{ backgroundColor: "green" }}
                        onClick={() => unsuspendmutation.mutate()}
                      >
                        Unsuspend
                      </button>
                    ) : (
                      <button
                        style={{ backgroundColor: "red" }}
                        onClick={() => {
                          const bool = confirm(
                            "Are You sure You Want to suspend this User ?"
                          );
                          if (bool) {
                            suspendmutation.mutate();
                          }
                        }}
                      >
                        suspend
                      </button>
                    )}
                  </div>
                  {/*//app-card-footer*/}
                </div>
                {/*//app-card*/}
              </div>
              {/*//col*/}
            </div>
            {/*//row*/}
          </div>
          {/*//container-fluid*/}
        </div>
        {/*//app-content*/}

        {/*//app-footer*/}
      </div>
    </div>
  );
}

export default User;
