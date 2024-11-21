// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './Dashboared.css';

// const WordManagement = () => {
//   const [data, setData] = useState([]);
//   const [editFormData, setEditFormData] = useState({
//     id: '',
//     name: '',
//     description: '',
//     price: '',
//     photo: null
//   });
//   const [newFormData, setNewFormData] = useState({
//     name: '',
//     description: '',
//     price: '',
//     photo: null
//   });
//   const [totalPages, setTotalPages] = useState(1);
//   const [profile, setProfile] = useState({
//     name: '',
//     password: ''
//   });
//   const navigate = useNavigate();

//   const fetchData = async () => {
//     try {
//       let page = 1;
//       let totalPages = 1;
//       let allFetchedData = [];

//       while (page <= totalPages) {
//         const response = await axios.post(`https://calamardoalicante.com/api/foods2?page=${page}`);
//         totalPages = response.data.totalPages;
//         const pageData = response.data.data;

//         allFetchedData = [...allFetchedData, ...pageData];
//         page += 1;
//       }

//       setData(allFetchedData);
//       setTotalPages(totalPages);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('No authentication token found');

//       const response = await axios.get('https://calamardoalicante.com/api/profile', {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       setProfile({
//         name: response.data.name,
//         password: '' // Don't set password for security reasons
//       });
//     } catch (error) {
//       console.error('Error fetching profile:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     fetchProfile();
//   }, []);

//   const handleChange = (e, isEdit = true) => {
//     const { name, value, files } = e.target;
//     const formData = isEdit ? editFormData : newFormData;
//     const setFormData = isEdit ? setEditFormData : setNewFormData;

//     if (name === 'photo' && files.length > 0) {
//       setFormData({
//         ...formData,
//         photo: files[0]
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value
//       });
//     }
//   };

//   const handleProfileChange = (e) => {
//     const { name, value } = e.target;
//     setProfile({
//       ...profile,
//       [name]: value
//     });
//   };

//   const handleEditSubmit = async (e) => {
//     e.preventDefault();

//     // Client-side validation
//     if (!editFormData.name || !editFormData.description || !editFormData.price) {
//       console.error('All fields are required');
//       return;
//     }

//     if (isNaN(editFormData.price)) {
//       console.error('Price must be a number');
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('No authentication token found');

//       const formData = new FormData();
//       formData.append('name', editFormData.name);
//       formData.append('description', editFormData.description);
//       formData.append('price', editFormData.price);
//       if (editFormData.photo) {
//         formData.append('photo', editFormData.photo);
//       }

//       const response = await axios.post(`https://calamardoalicante.com/api/update_food/${editFormData.id}`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       console.log('Item edited:', response.data);

//       setData(data.map(item => (item.id === editFormData.id ? response.data.data : item)));
//       setEditFormData({
//         id: '',
//         name: '',
//         description: '',
//         price: '',
//         photo: null
//       });
//     } catch (error) {
//       console.error('Error editing item:', error);
//     }
//   };

//   const handleAddSubmit = async (e) => {
//     e.preventDefault();

//     // Client-side validation
//     if (!newFormData.name || !newFormData.description || !newFormData.price) {
//       console.error('All fields are required');
//       return;
//     }

//     if (isNaN(newFormData.price)) {
//       console.error('Price must be a number');
//       return;
//     }

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('No authentication token found');

//       const formData = new FormData();
//       formData.append('name', newFormData.name);
//       formData.append('description', newFormData.description);
//       formData.append('price', newFormData.price);
//       if (newFormData.photo) {
//         formData.append('photo', newFormData.photo);
//       }

//       const response = await axios.post(`https://calamardoalicante.com/api/foods`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'multipart/form-data'
//         }
//       });

//       console.log('New item added:', response.data);

//       setData([...data, response.data.data]);
//       setNewFormData({ name: '', description: '', price: '', photo: null });
//     } catch (error) {
//       console.error('Error adding new item:', error);
//     }
//   };

//   const handleDeleteSubmit = async (id) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('No authentication token found');

//       await axios.delete(`https://calamardoalicante.com/api/foods/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       console.log('Item deleted:', id);
//       setData(data.filter(item => item.id !== id));
//     } catch (error) {
//       console.error('Error deleting item:', error);
//     }
//   };

//   const handleProfileSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('No authentication token found');

//       await axios.put('https://calamardoalicante.com/api/updateProfile', profile, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       console.log('Profile updated:', profile);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) throw new Error('No authentication token found');

//       await axios.post('https://calamardoalicante.com/api/logout', {}, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });

//       localStorage.removeItem('isAuthenticated');
//       localStorage.removeItem('token');
//       navigate('/');
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   };

//   return (
//     <div className='Contact dash'>
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//   <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//     <span className="navbar-toggler-icon"></span>
//   </button>
//   <div className="collapse navbar-collapse" id="navbarNav">
//     <ul className="navbar-nav ">
//       <li className="nav-item active">
//         <a className="nav-link " href="#addfood">add food</a>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link " href="#allfood">items foods</a>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link " href="#profile">update profile</a>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link " href="#">log out</a>
//       </li>
//       <li className="nav-item">
//         <a className="nav-link  disabled" href="#">Disabled</a>
//       </li>
//       <li>
//         <button className='submit' onClick={handleLogout}>Logout</button>
//       </li>
//     </ul>
//   </div>
// </nav>
//       <div>
//         <button className='submit' onClick={handleLogout}>Logout</button>
//       </div>
//       <hr />
//       {editFormData.id && (
//         <form className='Contact' onSubmit={handleEditSubmit}>
//           <h2>Edit Item</h2>
//           <input
//             type="text"
//             name="name"
//             value={editFormData.name}
//             onChange={(e) => handleChange(e, true)}
//             placeholder="Name"
//           />
//           <input
//             type="text"
//             name="price"
//             value={editFormData.price}
//             onChange={(e) => handleChange(e, true)}
//             placeholder="Price"
//           />
//           <textarea
//             name="description"
//             value={editFormData.description}
//             onChange={(e) => handleChange(e, true)}
//             placeholder="Description"
//           />
//           <input
//             type="file"
//             name="photo"
//             onChange={(e) => handleChange(e, true)}
//           />
//           <button type="submit">Save</button>
//         </form>
//       )}

//       <form onSubmit={handleAddSubmit}>
//         <h2>Add New Item</h2>
//         <input
//           type="text"
//           name="name"
//           value={newFormData.name}
//           onChange={(e) => handleChange(e, false)}
//           placeholder="Name"
//         />
//         <input
//           type="text"
//           name="price"
//           value={newFormData.price}
//           onChange={(e) => handleChange(e, false)}
//           placeholder="Price"
//         />
//         <textarea
//           name="description"
//           value={newFormData.description}
//           onChange={(e) => handleChange(e, false)}
//           placeholder="Description"
//         />
//         <input
//           className='dashimg'
//           type="file"
//           name="photo"
//           onChange={(e) => handleChange(e, false)}
//         />
//         <button type="submit" className='submit'>Add</button>
//       </form>

//       <hr />
     

//       <div className="pagination">
//         {/* Pagination logic can be added here if needed */}
//       </div>
//       <hr />
//       <h1>Items Management</h1>

//       <div className="card-container backColor">
//         {data.map((item) => (
//           <div key={item.id} className="food-item">
//             <img className='imgCard' src={item.photo} alt={item.name} />
//             <h3 className='nameCard'>{item.name} <span>{item.price}</span></h3>
//             <p className='decrption desCard'>{item.description}</p>
//             <button className='submit' onClick={() => setEditFormData({
//               id: item.id,
//               name: item.name,
//               description: item.description,
//               price: item.price,
//               photo: null
//             })}>Edit</button>
//             <button className='submit' onClick={() => handleDeleteSubmit(item.id)}>Delete</button>
//           </div>
//         ))}
//       </div>
//       <hr />
//       <form onSubmit={handleProfileSubmit} className="profile-form">
//         <h2>Update Profile</h2>
//         <input
//           type="text"
//           name="name"
//           value={profile.name}
//           onChange={handleProfileChange}
//           placeholder="Name"
//         />
//         <input
//           type="password"
//           name="password"
//           value={profile.password}
//           onChange={handleProfileChange}
//           placeholder="Password"
//         />
//         <button type="submit" className='submit'>Update Profile</button>
//       </form>
//       <hr />
     
//     </div>
//   );
// };

// export default WordManagement;





import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboared.css';

const WordManagement = () => {
  const [data, setData] = useState([]);
  const [editFormData, setEditFormData] = useState({
    id: '',
    name: '',
    description: '',
    price: '',
    photo: null
  });
  const [newFormData, setNewFormData] = useState({
    name: '',
    description: '',
    price: '',
    photo: null
  });

  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // تسجيل الدخول والحصول على التوكن
  const login = async () => {
    try {
      const response = await axios.post('https://calamardoalicante.com/api/login', {
        name: 'developer',
        password: 'devloperadmin'
      });

      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token); // تخزين التوكن في localStorage
        console.log('Login successful. Token stored.');
      } else {
        console.error('Login failed: No token received.');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      let page = 1; // ابدأ من الصفحة الأولى
      let allFetchedData = [];
      let hasMoreData = true;

      while (hasMoreData) {
        const response = await axios.get(`https://calamardoalicante.com/api/foods?page=${page}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (!response.data || !Array.isArray(response.data.data)) {
          throw new Error("Unexpected response structure");
        }

        const pageData = response.data.data;

        allFetchedData = [...allFetchedData, ...pageData];

        hasMoreData = pageData.length > 0; // إذا لم تعد هناك بيانات، توقف
        page += 1; // انتقل إلى الصفحة التالية
      }

      setData(allFetchedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const initialize = async () => {
      await login(); // تسجيل الدخول
      await fetchData(); // جلب البيانات
    };
    initialize();
  }, []);

  const handleChange = (e, isEdit = true) => {
    const { name, value, files } = e.target;
    const formData = isEdit ? editFormData : newFormData;
    const setFormData = isEdit ? setEditFormData : setNewFormData;

    if (name === 'photo' && files.length > 0) {
      setFormData({
        ...formData,
        photo: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // بقية الكود (الإضافة، التعديل، الحذف، تسجيل الخروج، واجهة المستخدم) يبقى كما هو...

  

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!editFormData.name || !editFormData.description || !editFormData.price) {
      console.error('All fields are required');
      return;
    }

    if (isNaN(editFormData.price)) {
      alert('Price must be a number');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const formData = new FormData();
      formData.append('name', editFormData.name);
      formData.append('description', editFormData.description);
      formData.append('price', editFormData.price);
      if (editFormData.photo) {
        formData.append('photo', editFormData.photo);
      }

      const response = await axios.post(`https://calamardoalicante.com/api/update_food/${editFormData.id}`, formData, {
        headers: {
          'Accept':'application/json',
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Item edited:', response.data);

      setData(data.map(item => (item.id === editFormData.id ? response.data.data : item)));
      setEditFormData({
        id: '',
        name: '',
        description: '',
        price: '',
        photo: null
      });
    } catch (error) {
      console.error('Error editing item:', error);
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!newFormData.name || !newFormData.description || !newFormData.price) {
      console.error('All fields are required');
      return;
    }

    if (isNaN(newFormData.price)) {
      console.error('Price must be a number');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const formData = new FormData();
      formData.append('name', newFormData.name);
      formData.append('description', newFormData.description);
      formData.append('price', newFormData.price);
      if (newFormData.photo) {
        formData.append('photo', newFormData.photo);
      }

      const response = await axios.post(`https://calamardoalicante.com/api/foods`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('New item added:', response.data);

      setData([...data, response.data.data]);
      setNewFormData({ name: '', description: '', price: '', photo: null });
    } catch (error) {
      console.error('Error adding new item:', error);
    }
  };

  const handleDeleteSubmit = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      await axios.delete(`https://calamardoalicante.com/api/foods/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log('Item deleted:', id);
      setData(data.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

 

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      await axios.post('https://calamardoalicante.com/api/logout', {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('token');
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div className='dashboard'>
      <div className='sidebar'>
        <nav>
          <ul>
            <li><a href="#addfood">Add Food</a></li>
            <li><a href="#allfood">Items Foods</a></li>
            <li><a href="#adddrinks">Add drinks</a></li>
            <li><a href="#alldrinks">Items drinks</a></li>
            <li><a href="#profile">Update Profile</a></li>
            <div><button className='submit' onClick={handleLogout}>Logout</button></div>
          </ul>
        </nav>
      </div>
      <div className='content dash'>
        <h1>Foods</h1>
        <hr />
  

        <form onSubmit={handleAddSubmit} id="addfood">
          <h2>Add New Foods</h2>
          <input
            type="text"
            name="name"
            value={newFormData.name}
            onChange={(e) => handleChange(e, false)}
            placeholder="Name"
          />
          <input
            type="text"
            name="price"
            value={newFormData.price}
            onChange={(e) => handleChange(e, false)}
            placeholder="Price"
          />
          <textarea
            name="description"
            value={newFormData.description}
            onChange={(e) => handleChange(e, false)}
            placeholder="Description"
          />
          <input
            className='dashimg'
            type="file"
            name="photo"
            onChange={(e) => handleChange(e, false)}
          />
          <button type="submit" className='submit'>Add</button>
        </form>
<hr />

{editFormData.id && (
          <form className='contact' onSubmit={handleEditSubmit}>
            <h2>Edit Item food</h2>
            <input
              type="text"
              name="name"
              value={editFormData.name}
              onChange={(e) => handleChange(e, true)}
              placeholder="Name"
            />
            <input
              type="text"
              name="price"
              value={editFormData.price}
              onChange={(e) => handleChange(e, true)}
              placeholder="Price"
            />
            <textarea
              name="description"
              value={editFormData.description}
              onChange={(e) => handleChange(e, true)}
              placeholder="Description"
            />
            <input
              type="file"
              name="photo"
              onChange={(e) => handleChange(e, true)}
            />
            <button className='submit' type="submit">Save</button>
          </form>
        )}



        <hr />
        <h1 id="allfood">Items Management Foods</h1>

        <div className="card-container backColor">
          {data.map((item) => (
            <div key={item.id} className="food-item dash_food">
              <img className='imgCard' src={`https://calamardoalicante.com/api/image/${item.photo}`} alt={item.name} />
              <h3 className='nameCard'>{item.name} <span>{item.price}</span></h3>
              <p className='decrption desCard'>{item.description}</p>
              <button className='submit' onClick={() => setEditFormData({
                id: item.id,
                name: item.name,
                description: item.description,
                price: item.price,
                photo: null
              })}>Edit</button>
              <button className='submit' onClick={() => handleDeleteSubmit(item.id)}>Delete</button>
            </div>
          ))}
        </div>
        <hr />
     
      </div>
    </div>
  );
};

export default WordManagement;