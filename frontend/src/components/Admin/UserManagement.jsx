import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { 
  fetchUsers,
  addUser,
  updateUser,
  deleteUser
  
} from '../../redux/slices/adminSlice';  // Adjust path as needed


const UserManagement = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user } = useSelector((state) => state.auth);
    const { users, loading, error} = useSelector((state) => state.admin);

    useEffect(() => {
        if(user && user.role === "admin") {
           dispatch (fetchUsers());
        } else {
            navigate("/")
        }
    }, [user, navigate, dispatch]);

// const users = [
//     {   
//         _id : 123213,
//         name  : "Shivam Tiwari",
//         email : "shivam@example.com",
//         role  : "admin",
//     },
// ];

const [formData , setFormData] = useState ({
    name: "",
    email:"",
    password: "",
    role: "customer", //Default role
});




const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value,
    });
};

    const handleSubmit = (e) => {
        e.preventDefault();
       dispatch(addUser(formData));

        //Reset the form after resubmission
        setFormData({
            name: "",
            email: "",
            password: "",
            role: "customer",
        });
    };

    const handleRoleChange = (userId, newRole) => {
    const userToUpdate = users.find((u) => u._id === userId);
    if (userToUpdate) {
        dispatch(updateUser({
            id: userId,
            name: userToUpdate.name,
            email: userToUpdate.email,
            role: newRole
        }));
    }
};


    const handleDeleteUser = (userId) => {
        if(window.confirm("Are you sure you want to delete this user ? ")){
           dispatch(deleteUser(userId));
        }
    };


  return (
    <div className="max-w-7xl mx-auto p-6" >
        <h2 className="text-2xl font-bold mb-2" >User Management</h2>
        { loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        {/*Add New User Form */}
        <div className="p-6 rounded-lg mb-6 " >
            <h3 className="text-lg font-bold mb-4" >Add New User</h3>
            <form onSubmit={handleSubmit} >
                <div className="mb-4">
                    <label className="block text-gray-700" >Name</label>
                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    />

                </div>

                <div className="mb-4">
                    <label className="block text-gray-700" >Email</label>
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    />

                </div>

                <div className="mb-4">
                    <label className="block text-gray-700" >Password</label>
                    <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                    />

                </div>

                <div className="mb-4">
                    <label className="block text-gray-700" >Role</label>
                    <select
                     name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
               <button type="submit" className="bg-green-500  text-white py-2 px-4 rounded hover:bg-green-600" >
                Add User
               </button>
            </form>

        </div>
       {/*user list management */}    
       <div className="overflow-x-auto shadow-md sm:rounded-lg" >
        <table className="table-fixed w-full bg-gray-100 text-xs uppercase text-gray-700" >
            <thead className="bg-gray-100 text-xs uppercase text-gray-700" >
                <tr>
                    <th className="py-3 px-4 text-left" >Name</th>
                    <th className="py-3 px-4 text-left" >Email</th>
                    
                    <th className="py-3 px-4 text-left" >Role</th>
                    <th className="py-3 px-4 text-left" >Actions</th>
                </tr>

            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user._id} className="border-b hover:bg-gray-50" > 
                    <td className="p-4 font-medium text-gray-900 whitespace-nowrap" >
                        {user.name}
                    </td>
                    <td className="p-4" >{user.email}</td>
                    <td className="p-4" >
                        <select 
                        value={user.role}
                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                        className="p-2 border rounded"
                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                            </select></td>
                    <td className="p-4" >
                       <button onClick={() => handleDeleteUser(user._id)}
                       className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                       >
                         Delete
                       </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

       </div>
    </div>
  );
};

export default UserManagement
