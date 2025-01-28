# User Management Dashboard

This project is a simple **User Management Dashboard** built using ReactJS. It allows users to view, add, edit, and delete user information, with features like pagination and dynamic forms.

## Features

1. **View Users**: Displays a list of users fetched from a REST API.
2. **Add Users**: Add a new user with fields like first name, last name, email, and department.
3. **Edit Users**: Modify existing user details.
4. **Delete Users**: Remove a user from the list.
5. **Pagination**: Navigate through user data with a specified number of rows per page.
6. **Responsive UI**: User-friendly interface styled using CSS.

## Technology Stack

- **Frontend**: ReactJS
- **HTTP Client**: Axios
- **Icons**: React Icons
- **CSS**: For styling
- **API**: JSONPlaceholder (Mock REST API for user data)

## File Structure

```
root
├── src
│   ├── components
│   │   ├── Dashboard.js    # Main Dashboard Component
        ├── Dashboard.css  
│   ├── App.js             # Entry Point for the Application
│   ├── index.css          # Global Styles
│
├── public
│   ├── index.html         # Main HTML File
│
├── package.json           # Dependency Manager
```

## Setup Instructions

Follow these steps to set up the project locally:

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd user-management-dashboard
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## Usage

### Viewing Users
- Upon loading the application, users from the API are displayed in a table format with pagination.

### Adding a User
- Click the "Add User" button.
- Fill in the form and click "Add" to save the user.

### Editing a User
- Click the edit button (pencil icon) next to a user.
- Modify the details in the form and click "Update" to save changes.

### Deleting a User
- Click the delete button (trash icon) next to a user.
- The user will be removed from the list.

### Pagination
- Use the "Prev" and "Next" buttons to navigate between pages.

## API

- **Base URL**: `https://jsonplaceholder.typicode.com/users`

### Endpoints
1. `GET /users`: Fetch all users.
2. `POST /users`: Add a new user.
3. `PUT /users/:id`: Update user details.
4. `DELETE /users/:id`: Delete a user.

## Future Enhancements

1. **Search Functionality**: Add a search bar to filter users by name or email.
2. **Sort Functionality**: Allow sorting of users based on columns like name or department.
3. **Improved Error Handling**: Display detailed error messages for failed API calls.
4. **Backend Integration**: Replace mock API with a real backend service.

## Dependencies

- ReactJS
- Axios
- React Icons
- JSONPlaceholder (Mock API)

## License

This project is licensed under the MIT License. Feel free to use and modify the code.

---

Thank you for using the **User Management Dashboard**!
