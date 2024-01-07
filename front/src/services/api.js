const API_BASE_URL = 'http://localhost:8000';


const buyApi = {
  add: (buy, accessToken) => fetch(`${API_BASE_URL}/buy/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken,
    },
    body: JSON.stringify(buy),
  }).then(response => response.json()),

  update: (buyId, buy, accessToken) => fetch(`${API_BASE_URL}/buy/update/${buyId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': accessToken,
    },
    body: JSON.stringify(buy),
  }).then(response => response.json()),

  delete: (buyId, accessToken) => fetch(`${API_BASE_URL}/buy/delete/${buyId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': accessToken,
    },
  }),

  getAll: (accessToken) => fetch(`${API_BASE_URL}/buy/all`, {
    headers: {
      'Authorization': accessToken,
    },
  }).then(response => response.json()),

  getById: (buyId, accessToken) => fetch(`${API_BASE_URL}/buy/search/${buyId}`, {
    headers: {
      'Authorization': accessToken,
    },
  }).then(response => response.json()),
};

const userApi = {
    register: (user) => {
      return fetch(`${API_BASE_URL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      }).then(response => response.json());
    },
  
    login: (credentials) => {
      return fetch(`${API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      }).then(response => response.json());
    },
  
    getAllUsers: (accessToken) => {
      return fetch(`${API_BASE_URL}/user/all`, {
        headers: {
          'Authorization': accessToken,
        },
      }).then(response => response.json());
    },
  
    getById: (userId, accessToken) => {
      return fetch(`${API_BASE_URL}/user/search/${userId}`, {
        headers: {
          'Authorization': accessToken,
        },
      }).then(response => response.json());
    },
  
    updateUser: (userId, userData, accessToken) => {
      return fetch(`${API_BASE_URL}/user/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken,
        },
        body: JSON.stringify(userData),
      }).then(response => response.json());
    },
  
    deleteUser: (userId, accessToken) => {
      return fetch(`${API_BASE_URL}/user/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': accessToken,
        },
      });
    },
  };
  
  const toolApi = {
    createTool: (toolData, accessToken) => {
      return fetch(`${API_BASE_URL}/tool/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken,
        },
        body: JSON.stringify(toolData),
      }).then(response => response.json());
    },
  
    getAllTools: (accessToken) => {
      return fetch(`${API_BASE_URL}/tool/all`, {
        headers: {
          'Authorization': accessToken,
        },
      }).then(response => response.json());
    },
  
    getToolById: (toolId, accessToken) => {
      return fetch(`${API_BASE_URL}/tool/search/${toolId}`, {
        headers: {
          'Authorization': accessToken,
        },
      }).then(response => response.json());
    },
  
    updateTool: (toolId, toolData, accessToken) => {
      return fetch(`${API_BASE_URL}/tool/update/${toolId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken,
        },
        body: JSON.stringify(toolData),
      }).then(response => response.json());
    },
  
    deleteTool: (toolId, accessToken) => {
      return fetch(`${API_BASE_URL}/tool/delete/${toolId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': accessToken,
        },
      });
    },
  };
  
  const getApi = {
    add: (getData, accessToken) => {
      return fetch(`${API_BASE_URL}/carOption/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken,
        },
        body: JSON.stringify(getData),
      }).then(response => response.json());
    },
  
    getAll: (accessToken) => {
      return fetch(`${API_BASE_URL}/carOption/all`, {
        headers: {
          'Authorization': accessToken,
        },
      }).then(response => response.json());
    },
  
    getById: (getId, accessToken) => {
      return fetch(`${API_BASE_URL}/carOption/search/${getId}`, {
        headers: {
          'Authorization': accessToken,
        },
      }).then(response => response.json());
    },
  
    update: (getId, getData, accessToken) => {
      return fetch(`${API_BASE_URL}/carOption/update/${getId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken,
        },
        body: JSON.stringify(getData),
      }).then(response => response.json());
    },
  
    delete: (getId, accessToken) => {
      return fetch(`${API_BASE_URL}/carOption/delete/${getId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': accessToken,
        },
      });
    },
    getByModelId: (modelId, accessToken) => {
      return fetch(`${API_BASE_URL}/carOption/byModel/${modelId}`, {
          headers: {
              'Authorization': accessToken,
          },
      }).then(response => response.json());
  },

  getByToolId: (toolId, accessToken) => {
      return fetch(`${API_BASE_URL}/carOption/byTool/${toolId}`, {
          headers: {
              'Authorization': accessToken,
          },
      }).then(response => response.json());
  }
  };
  
  const modelApi = {
    add: (modelData, accessToken) => {
        const token = accessToken;
        const formData = new FormData();
        
        Object.keys(modelData).forEach(key => {
          if (key === 'image' && modelData[key]) {
            formData.append(key, modelData[key]);
          } else {
            formData.append(key, modelData[key]);
          }
        });
    
        return fetch(`${API_BASE_URL}/model/add`, {
          method: 'POST',
          headers: {
            'Authorization': accessToken,
          },
          body: formData,
        }).then(response => response.json());
      },

    getModelById: (modelId, accessToken) => {
      return fetch(`${API_BASE_URL}/model/search/${modelId}`, {
        headers: {
          'Authorization': accessToken,
        },
      }).then(response => response.json());
    },

    getAllModels: (accessToken) => {
        return fetch(`${API_BASE_URL}/model/all`, {
          headers: {
            'Authorization': accessToken,
          },
        }).then(response => response.json());
      },
  
    update: (modelId, modelData, accessToken) => {
      return fetch(`${API_BASE_URL}/model/update/${modelId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken,
        },
        body: JSON.stringify(modelData),
      }).then(response => response.json());
    },
  
    delete: (modelId, accessToken) => {
      return fetch(`${API_BASE_URL}/model/delete/${modelId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': accessToken,
        },
      });
    },
  };
  
export { buyApi, userApi, toolApi, getApi, modelApi };
