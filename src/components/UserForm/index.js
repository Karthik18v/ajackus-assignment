import "./index.css";

const UserForm = () => {
  return (
    <div class="add-user-container">
      <form className="form-container">
        <h2>Add User</h2>
        <label for="firstName">First Name</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Enter First Name"
          required
        />

        <label for="lastName">Last Name</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Enter Last Name"
          required
        />

        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Email"
          required
        />

        <label for="department">Department</label>
        <input
          type="text"
          id="department"
          name="department"
          placeholder="Enter Department"
          required
        />
        <div className="btn-container">
          <button type="submit" class="cancel-btn btn">
            Cancel
          </button>
          <button type="submit" class="confirm-btn btn">
            Confirm
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
