import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Dashboared.css';

const WordManagement = () => {
  const [data, setData] = useState([]);
  const [editFormData, setEditFormData] = useState({
    id: '',
    name: '',

    price: '',
    photo: null
  });
  const [newFormData, setNewFormData] = useState({
    name: '',

    price: '',
    photo: null
  });
  const [totalPages, setTotalPages] = useState(1);
  const [profile, setProfile] = useState({
    name: '',
    password: ''
  });
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      let page = 1;
      let totalPages = 1;
      let allFetchedData = [];

      while (page <= totalPages) {
        const response = await axios.get(`https://calamardoalicante.com/api/drinks?page=${page}`);
        totalPages = response.data.totalPages;
        const pageData = response.data.data;

        allFetchedData = [...allFetchedData, ...pageData];
        page += 1;
      }

      setData(allFetchedData);
      setTotalPages(totalPages);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const response = await axios.get('https://calamardoalicante.com/api/login', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setProfile({
        name: response.data.name,
        password: '' // Don't set password for security reasons
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchProfile();
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

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!editFormData.name  || !editFormData.price) {
      console.error('All fields are required');
      return;
    }

    if (isNaN(editFormData.price)) {
      console.error('Price must be a number');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const formData = new FormData();
      formData.append('name', editFormData.name);
      formData.append('price', editFormData.price);
      if (editFormData.photo) {
        formData.append('photo', editFormData.photo);
      }

      const response = await axios.post(`https://calamardoalicante.com/api/update_drink/${editFormData.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Item edited:', response.data);

      setData(data.map(item => (item.id === editFormData.id ? response.data.data : item)));
      setEditFormData({
        id: '',
        name: '',
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
    if (!newFormData.name  || !newFormData.price) {
      alert('All fields are required');
      return;
    }

    if (isNaN(newFormData.price)) {
      alert('Price must be a number');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      const formData = new FormData();
      formData.append('name', newFormData.name);
      formData.append('price', newFormData.price);
      if (newFormData.photo) {
        formData.append('photo', newFormData.photo);
      }

      const response = await axios.post(`https://calamardoalicante.com/api/drinks`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('New item added:', response.data);

      setData([...data, response.data.data]);
      setNewFormData({ name: '', price: '', photo: null });
    } catch (error) {
      console.error('Error adding new item:', error);
    }
  };

  const handleDeleteSubmit = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      await axios.delete(`https://calamardoalicante.com/api/drinks/${id}`, {
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

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No authentication token found');

      await axios.put('https://calamardoalicante.com/api/updateProfile', profile, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      alert('Profile updated:', profile);
    } catch (error) {
      console.error('Error updating profile:', error);
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
    <div className='Contact dash'>
        <h1>Drinks</h1>
        <hr />
   
      <form onSubmit={handleAddSubmit}>
        <h2 id='adddrinks'>Add New Drinks</h2>
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
          <h2 >Edit Item Drinks</h2>
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
          <input
            type="file"
            name="photo"
            onChange={(e) => handleChange(e, true)}
          />
          <button className='submit' type="submit">Save</button>
        </form>
      )}

<hr />
    
      <h1 id='alldrinks'>Items Management Drinks</h1>

<div className="card-container backColor">
  {data.map((item) => (
    <div key={item.id} className="food-item dash_drinks">
      <img className='imgCard' src={`https://calamardoalicante.com/api/image/${item.photo}`} alt={item.name} />
      <h3 className='nameCard'>{item.name} <span>{item.price}</span></h3>
      <button className='submit' onClick={() => setEditFormData({
        id: item.id,
        name: item.name,
        price: item.price,
        photo: null
      })}>Edit</button>
      <button className='submit' onClick={() => handleDeleteSubmit(item.id)}>Delete</button>
    </div>
  ))}
</div>
<hr />
<form onSubmit={handleProfileSubmit} className="profile-form">
        <h2 id='profile'>Update Profile</h2>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={handleProfileChange}
          placeholder="Name"
        />
        <input
          type="password"
          name="password"
          value={profile.password}
          onChange={handleProfileChange}
          placeholder="Password"
        />
        <button type="submit" className='submit'>Update Profile</button>
      </form>
     
    </div>
  );
};

export default WordManagement;
