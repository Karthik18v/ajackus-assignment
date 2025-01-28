import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import axios from "axios";
import "./index.css";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [form, setForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    id: null,
    firstname: "",
    lastname: "",
    email: "",
    department: "",
  });

  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const rowsPerPage = 5; // Number of rows per page

  const API_URL = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    const response = await axios.get(API_URL);
    if (response.status === 200) {
      setUsers(response.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedUserData = {
      ...userData,
      name: `${userData.firstname} ${userData.lastname}`,
    };

    if (isEditing) {
      try {
        const response = await axios.put(
          `${API_URL}/${userData.id}`,
          updatedUserData
        );
        if (response.status === 200) {
          setUsers(
            users.map((user) =>
              user.id === userData.id ? { ...user, ...updatedUserData } : user
            )
          );
          setIsEditing(false);
          setForm(false);
        }
      } catch (error) {
        setError("Failed to update user. Please try again.");
      }
    } else {
      try {
        const response = await axios.post(API_URL, updatedUserData);
        if (response.status === 201) {
          setUsers([...users, response.data]);
          setForm(false);
        }
      } catch (error) {
        setError("Failed to add user. Please try again.");
      }
    }

    setUserData({
      id: null,
      firstname: "",
      lastname: "",
      email: "",
      department: "",
    });
  };

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`${API_URL}/${userId}`);
      if (response.status === 200) {
        const updatedUsers = users.filter((user) => user.id !== userId);
        setUsers(updatedUsers);
        const startIndex = (currentPage - 1) * rowsPerPage;
        const endIndex = currentPage * rowsPerPage;
        const remainingUsers = updatedUsers.slice(startIndex, endIndex);

        if (remainingUsers.length === 0 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      }
    } catch (err) {
      setError("Failed to delete user. Please try again.");
    }
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setForm(true);
    setUserData({
      id: user.id,
      firstname: user.name.split(" ")[0],
      lastname: user.name.split(" ")[1],
      email: user.email,
      department: user.department || "",
    });
  };

  const onClickAddUser = () => {
    setIsEditing(false);
    setForm(true);
    setUserData({
      id: null,
      firstname: "",
      lastname: "",
      email: "",
      department: "",
    });
  };

  const onClickCancel = () => {
    setForm(false);
    setIsEditing(false);
  };

  const totalPages = Math.ceil(users.length / rowsPerPage);
  const paginatedUsers = users.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const onClickNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const onClickPrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="main">
      <div className="header">
        <h1>User Management Dashboard</h1>
      </div>
      {!form && (
        <>
          <div className="heading-add-container">
            <h1>User List</h1>
            <button className="add-button" onClick={onClickAddUser}>
              <FaPlus />
              Add User
            </button>
          </div>

          {users.length > 0 && (
            <>
              <div className="pagination">
                <button onClick={onClickPrevPage} disabled={currentPage === 1}>
                  Prev
                </button>
                <p>
                  {currentPage}/{totalPages}
                </p>
                <button
                  onClick={onClickNextPage}
                  disabled={currentPage === totalPages}
                >
                  Next
                </button>
              </div>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>Department</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedUsers.map((eachUser) => (
                      <tr key={eachUser.id}>
                        <td>{eachUser.id}</td>
                        <td>{eachUser.name.split(" ")[0]}</td>
                        <td>{eachUser.name.split(" ")[1]}</td>
                        <td>{eachUser.email}</td>
                        <td>{eachUser.department || "NA"}</td>
                        <td>
                          <button
                            className="edit-button"
                            onClick={() => handleEdit(eachUser)}
                          >
                            <MdOutlineModeEditOutline size={20} />
                          </button>
                          <button
                            className="delete-button"
                            onClick={() => handleDelete(eachUser.id)}
                          >
                            <MdDelete size={20} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}

      {form && (
        <div className="add-user-container">
          <form className="form-container" onSubmit={handleSubmit}>
            <h2>{isEditing ? "Edit User" : "Add User"}</h2>

            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Enter First Name"
              value={userData.firstname}
              onChange={handleChange}
              required
            />

            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Enter Last Name"
              value={userData.lastname}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={userData.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="department">Department</label>
            <input
              type="text"
              id="department"
              name="department"
              placeholder="Enter Department"
              value={userData.department}
              onChange={handleChange}
              required
            />

            <div className="btn-container">
              <button
                type="button"
                className="cancel-btn btn"
                onClick={onClickCancel}
              >
                Cancel
              </button>
              <button type="submit" className="confirm-btn btn">
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
