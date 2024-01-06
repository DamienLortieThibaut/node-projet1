import React, { useState, useEffect } from 'react';
import { modelApi } from '../../services/api';
import './Admin.css';

function Admin() {
  const [models, setModels] = useState([]);
  const [newModel, setNewModel] = useState({
    name: '',
    description: '',
    prize: '',
    image: null,
  });
  const [editModel, setEditModel] = useState(null);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = () => {
    modelApi.getAllModels().then(data => setModels(data));
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === 'image' ? files[0] : value;

    if (editModel) {
      setEditModel(prevState => ({
        ...prevState,
        [name]: newValue,
      }));
    } else {
      setNewModel(prevState => ({
        ...prevState,
        [name]: newValue,
      }));
    }
  };

  const handleAddModel = () => {
    modelApi.add(newModel).then(() => {
      fetchModels();
      setNewModel({
        name: '',
        description: '',
        prize: '',
        image: null,
      });
    });
  };

  const handleEditModel = (modelId) => {
    const modelToEdit = models.find(model => model.id === modelId);
    setEditModel(modelToEdit);
  };

  const handleUpdateModel = () => {
    if (editModel) {
      modelApi.update(editModel.id, editModel).then(() => {
        fetchModels();
        setEditModel(null);
      });
    }
  };

  const handleDeleteModel = (modelId) => {
    modelApi.delete(modelId).then(() => {
      fetchModels();
    });
  };

  return (
    <div className='admin d-flex'>

<div id='table-content' className='w-75 d-flex flex-column align-items-start'>
        <h3>Liste des modèles</h3>
        <table className='table'>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Description</th>
              <th>Prix</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {models.map(model => (
              <tr key={model.id}>
                <td>{model.name}</td>
                <td>{model.description}</td>
                <td>{model.prize}</td>
                <td><img src={`http://localhost:8000/${model.image}`} alt={model.name} /></td>
                <td>
                  <button onClick={() => handleEditModel(model.id)}>Modifier</button>
                  <button onClick={() => handleDeleteModel(model.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='w-25 ml-5'>
        <h3>{editModel ? 'Modifier le modèle' : 'Ajouter un nouveau modèle'}</h3>
         <form className='d-flex flex-column' style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <label style={{ display: 'block', margin: '10px 0' }}>Nom:</label>
          <input
            type='text'
            name='name'
            value={editModel ? editModel.name : newModel.name}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />

          <label style={{ display: 'block', margin: '10px 0' }}>Description:</label>
          <input
            type='text'
            name='description'
            value={editModel ? editModel.description : newModel.description}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />

          <label style={{ display: 'block', margin: '10px 0' }}>Prix:</label>
          <input
            type='text'
            name='prize'
            value={editModel ? editModel.prize : newModel.prize}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
          />

          <label style={{ display: 'block', margin: '10px 0' }}>Image:</label>
          <input
            type='file'
            name='image'
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px', marginBottom: '20px' }}
          />

          {editModel ? (
            <button type='button' onClick={handleUpdateModel} style={{ background: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Mettre à jour</button>
          ) : (
            <button type='button' onClick={handleAddModel} style={{ background: '#008CBA', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Ajouter</button>
          )}
        </form>
      </div>

    
    </div>
  );
}

export default Admin;
