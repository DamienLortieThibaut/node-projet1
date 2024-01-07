const API_BASE_URL = 'http://localhost:8000';


const getAuthorizationToken = () => {
  // Replace with your logic to retrieve the authorization token
  // from wherever it is stored (e.g., localStorage)
  return localStorage.getItem('authorizationToken');
};

const buyApi = {
  add: (buy) => fetch(`${API_BASE_URL}/buy/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getAuthorizationToken(),
    },
    body: JSON.stringify(buy),
  }).then(response => response.json()),

  update: (buyId, buy) => fetch(`${API_BASE_URL}/buy/update/${buyId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': getAuthorizationToken(),
    },
    body: JSON.stringify(buy),
  }).then(response => response.json()),

  delete: (buyId) => fetch(`${API_BASE_URL}/buy/delete/${buyId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': getAuthorizationToken(),
    },
  }),

  getAll: () => fetch(`${API_BASE_URL}/buy/all`, {
    headers: {
      'Authorization': getAuthorizationToken(),
    },
  }).then(response => response.json()),

  getById: (buyId) => fetch(`${API_BASE_URL}/buy/search/${buyId}`, {
    headers: {
      'Authorization': getAuthorizationToken(),
    },
  }).then(response => response.json()),
};

const userApi = {
    register: (user) => {
      const token = getAuthorizationToken();
      return fetch(`${API_BASE_URL}/user/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
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
  
    getAllUsers: () => {
      const token = getAuthorizationToken();
      return fetch(`${API_BASE_URL}/user/all`, {
        headers: {
          'Authorization': token,
        },
      }).then(response => response.json());
    },
  
    getById: (userId) => {
      const token = getAuthorizationToken();
      return fetch(`${API_BASE_URL}/user/search/${userId}`, {
        headers: {
          'Authorization': token,
        },
      }).then(response => response.json());
    },
  
    updateUser: (userId, userData) => {
      const token = getAuthorizationToken();
      return fetch(`${API_BASE_URL}/user/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(userData),
      }).then(response => response.json());
    },
  
    deleteUser: (userId) => {
      const token = getAuthorizationToken();
      return fetch(`${API_BASE_URL}/user/delete/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
        },
      });
    },
  };
  
  const toolApi = {
    createTool: (toolData) => {
      const token = getAuthorizationToken();
      return fetch(`${API_BASE_URL}/tool/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(toolData),
      }).then(response => response.json());
    },
  
    getAllTools: () => {
      const token = getAuthorizationToken();
      return fetch(`${API_BASE_URL}/tool/all`, {
        headers: {
          'Authorization': token,
        },
      }).then(response => response.json());
    },
  
    getToolById: (toolId) => {
      const token = getAuthorizationToken();
      return fetch(`${API_BASE_URL}/tool/search/${toolId}`, {
        headers: {
          'Authorization': token,
        },
      }).then(response => response.json());
    },
  
    updateTool: (toolId, toolData) => {
      const token = getAuthorizationToken();
      return fetch(`${API_BASE_URL}/tool/update/${toolId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(toolData),
      }).then(response => response.json());
    },
  
    deleteTool: (toolId) => {
      const token = getAuthorizationToken();
      return fetch(`${API_BASE_URL}/tool/delete/${toolId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
        },
      });
    },
  };
  
  const getApi = {
    add: (getData) => {
      const token = getAuthorizationToken();
      return fetch(`${API_BASE_URL}/carOption/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(getData),
      }).then(response => response.json());
    },
  
    getAll: () => {
      const token = getAuthorizationToken();
      return fetch(`${API_BASE_URL}/carOption/all`, {
        headers: {
          'Authorization': token,
        },
      }).then(response => response.json());
    },
  
    getById: (getId) => {
      const token = getAuthorizationToken();
      return fetch(`${API_BASE_URL}/carOption/search/${getId}`, {
        headers: {
          'Authorization': token,
        },
      }).then(response => response.json());
    },
  
    update: (getId, getData) => {
      const token = getAuthorizationToken();
      return fetch(`${API_BASE_URL}/carOption/update/${getId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(getData),
      }).then(response => response.json());
    },
  
    delete: (getId) => {
      const token = getAuthorizationToken();
      return fetch(`${API_BASE_URL}/carOption/delete/${getId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
        },
      });
    },
    getByModelId: (modelId) => {
      const token = getAuthorizationToken();
      return fetch(`${API_BASE_URL}/carOption/byModel/${modelId}`, {
          headers: {
              'Authorization': token,
          },
      }).then(response => response.json());
  },

  getByToolId: (toolId) => {
      const token = getAuthorizationToken();
      return fetch(`${API_BASE_URL}/carOption/byTool/${toolId}`, {
          headers: {
              'Authorization': token,
          },
      }).then(response => response.json());
  }
  };
  
  const modelApi = {
    add: (modelData) => {
        const token = getAuthorizationToken();
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
            'Authorization': token,
          },
          body: formData,
        }).then(response => response.json());
      },

    getModelById: (modelId) => {
      const token = getAuthorizationToken();
      return fetch(`${API_BASE_URL}/model/search/${modelId}`, {
        headers: {
          'Authorization': token,
        },
      }).then(response => response.json());
    },

    getAllModels: () => {
        const token = getAuthorizationToken();
        return fetch(`${API_BASE_URL}/model/all`, {
          headers: {
            'Authorization': token,
          },
        }).then(response => response.json());
      },
  
    update: (modelId, modelData) => {
      const token = getAuthorizationToken();
      return fetch(`${API_BASE_URL}/model/update/${modelId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify(modelData),
      }).then(response => response.json());
    },
  
    delete: (modelId) => {
      const token = getAuthorizationToken();
      return fetch(`${API_BASE_URL}/model/delete/${modelId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': token,
        },
      });
    },
  };
  
export { buyApi, userApi, toolApi, getApi, modelApi };
