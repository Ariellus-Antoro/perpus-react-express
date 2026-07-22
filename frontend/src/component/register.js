import React, { useState } from 'react';
import './Register.css'; // <-- 1. Hubungkan file CSS di sini

function Register() {
  const [formData, setFormData] = useState({
    nik: '',
    email: '',
    password: '',
    full_name: '',
    address: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data yang akan dikirim ke Backend:", formData);
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>NIK:</label>
          <input 
            type="text" 
            name="nik" 
            maxLength="20"
            value={formData.nik} 
            onChange={handleChange} 
            className="form-input"
            required 
          />
        </div>

        <div className="form-group">
          <label>Nama Lengkap:</label>
          <input 
            type="text" 
            name="full_name" 
            maxLength="100"
            value={formData.full_name} 
            onChange={handleChange} 
            className="form-input"
            required 
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            maxLength="100"
            value={formData.email} 
            onChange={handleChange} 
            className="form-input"
            required 
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            maxLength="100"
            value={formData.password} 
            onChange={handleChange} 
            className="form-input"
            required 
          />
        </div>

        <div className="form-group">
          <label>No HP:</label>
          <input 
            type="text" 
            name="phone" 
            maxLength="15"
            value={formData.phone} 
            onChange={handleChange} 
            className="form-input"
            required 
          />
        </div>

        <div className="form-group">
          <label>Alamat:</label>
          <textarea 
            name="address" 
            maxLength="255"
            rows="3"
            value={formData.address} 
            onChange={handleChange} 
            className="form-textarea"
            required 
          />
        </div>

        <button type="submit" className="btn-submit">
          Daftar
        </button>
        
      </form>
    </div>
  );
}

export default Register;