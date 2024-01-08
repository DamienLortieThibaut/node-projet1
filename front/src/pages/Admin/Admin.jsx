import React, { useState, useEffect } from 'react';
import { modelApi, getApi, toolApi } from '../../services/api';
import './Admin.css';
import { useAuth } from '../../utils/provider';
function Admin() {
  const { accessToken} = useAuth();
  const [models, setModels] = useState([]);
  const [newModel, setNewModel] = useState({
    name: '',
    description: '',
    prize: '',
    image: null,
  });
  const [editModel, setEditModel] = useState(null);
  const [toolsEditModel, setToolsEditModel] = useState([]);
  const [allTools, setAllTools] = useState([]);
  const [fusionTab, setFusionTab] = useState([]);

  const fusionTabFunc = (all, edit) => {
    // Vérifier si 'edit' est un tableau
    if (!Array.isArray(edit)) {
      return all; // Retourner 'all' tel quel en cas d'erreur
    }
  
    let result = all.map((elem) => {
      // Vérifier si l'ID de l'élément de allTools existe dans toolsEditModel
      const hasMatchingId = edit.some((editElem) => editElem.id === elem.id);
  
      // Si l'ID existe, retourner l'élément de toolsEditModel
      if (hasMatchingId) {
        return edit.find((editElem) => editElem.id === elem.id);
      } else {
        // Sinon, retourner l'élément de allTools
        return elem;
      }
    });
    setFusionTab(result);
  };


  useEffect(() => {
    modelApi.getAllModels(accessToken).then(data => setModels(data));
    toolApi.getAllTools(accessToken).then(data => {
      setAllTools(data)
    });



  }, []);

  useEffect(() =>  {
    fusionTabFunc(allTools, toolsEditModel);    
  }, [toolsEditModel, allTools]);

  useEffect(() => {
    if(editModel) {
      getApi.getByModelId(editModel.id, accessToken).then(res => setToolsEditModel(res));
    }
    fusionTabFunc(allTools, toolsEditModel);    
  }, [editModel])

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
      modelApi.getAllModels(accessToken).then(data => setModels(data));
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
      modelApi.update(editModel.id, editModel, accessToken).then(() => {
        modelApi.getAllModels(accessToken).then(data => setModels(data));
        setEditModel([null]);
        setToolsEditModel([]);
        setFusionTab([]);
        setAllTools([]);
        
      });
    }
  };

  const handleDeleteModel = (modelId) => {
    modelApi.delete(modelId, accessToken).then(() => {
      modelApi.getAllModels(accessToken).then(data => setModels(data));
    });
  };

  const togglePrimary = (clickedTool, model) => {
    if (model && clickedTool) {
      let body = {
        toolId: clickedTool.id,
        is_primary: !clickedTool.is_primary,
        modelId: model.id,
      };
  
      getApi.update(body, accessToken).then((data) => {
        getApi.getByModelId(model.id, accessToken).then((res) => setToolsEditModel(res));
      });
    }
  };

  const toogleActivate = (clickedTool, model) => {
    let body = {
      toolId: clickedTool.id,
      is_primary: false,
      modelId: model.id,
    };
    if(clickedTool.is_primary === undefined){
      getApi.add(body, accessToken).then((data) => {
        getApi.getByModelId(model.id, accessToken).then((res) => setToolsEditModel(res));
      });  

    } else {
      getApi.delete(clickedTool.id, model.id, accessToken).then((data) => {
        getApi.getByModelId(model.id, accessToken).then((res) => setToolsEditModel(res));
      });
    }
  }

  return (
    <div className='admin d-flex flex-column-reverse'>

<div id='table-content' className='w-100 d-flex flex-column align-items-start my-5'>
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
                <td>{model.prize} €</td>
                <td><img src={`http://localhost:8000/${model.image}`} alt={model.name} /></td>
                <td>
                  <button className='btn btn-primary' onClick={() => handleEditModel(model.id)}>Modifier</button>
                  <button className='btn btn-danger' onClick={() => handleDeleteModel(model.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className='w-100 ml-5 d-flex justify-content-between'>
        <div >
        <h3>{editModel ? 'Modifier le modèle' : 'Ajouter un nouveau modèle'}</h3>
         <form className='d-flex flex-column' style={{ maxWidth: '400px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
          <label style={{ display: 'block', margin: '10px 0' }}>Nom:</label>
          <input
            type='text'
            name='name'
            value={editModel ? editModel.name : newModel.name}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }} required
          />

          <label style={{ display: 'block', margin: '10px 0' }}>Description:</label>
          <input
            type='text'
            name='description'
            value={editModel ? editModel.description : newModel.description}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }} required
          />

          <label style={{ display: 'block', margin: '10px 0' }}>Prix:</label>
          <input
            type='text'
            name='prize'
            value={editModel ? editModel.prize : newModel.prize}
            onChange={handleInputChange}
            style={{ width: '100%', padding: '10px', marginBottom: '10px' }} required
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
        {
          editModel && (
            <div className='w-50'>
          <h3>Modifier les options de base</h3>
          <table className='table w-100'>
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prix</th>
              <th>Rendre l'option obligatoire</th>
              <th>Activer l'option pour la voiture</th>
            </tr>
          </thead>
          <tbody>
            {fusionTab.map(tool => (
              <tr key={tool.id}>
                <td>{tool.name}</td>
                <td>{tool.prize} €</td>
                <td>                   
                  <input
                    type="checkbox"
                    onClick={(e) => togglePrimary(tool, editModel)}
                    checked={tool.is_primary !== undefined ? tool.is_primary : false}
                  />                
                  </td>
                <td>
                  <input type="checkbox"
                  onClick={(e) => toogleActivate(tool, editModel)}
                    checked={tool.is_primary !== undefined ? true : false}/>                
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
          )
        }
        
      </div>

    
    </div>
  );
}

export default Admin;
