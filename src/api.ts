import { NewUser } from './types'

const apiKey = '0c2879943b7cbdbecda978af351d0ffbd39c3f8a7e6a446bdeba4134feb7abcc';
const apiEndpoint = 'https://gorest.co.in/public/v2/users';

// Simulating deelay
const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * ms));

const api = {
  // Function to get user list
  list: async () => {
    await sleep(100);

    try {
      const response = await fetch(apiEndpoint, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data = await response.json();
      return data;

    } catch (error) {
      console.error('Error in api list:', error);
      return null;
    };

  },

  // Function to add user
  create: async (user: NewUser) => {
    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`, 
        },
        body: JSON.stringify(user),
      });
      
      if(!response.ok) {
        throw new Error('Failed to create user');
      };
      const newUser = await response.json();
      
      return newUser;
    } catch (error) {
      console.error('Error in api post', error);
      return null;
    }
  },

  // Function to delete user
  delete: async (userId: number) => {
    try {
      const response = await fetch(`${apiEndpoint}/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete user with ID ${userId}`);
      }

      return true;

    } catch (error) {
      console.error('Error in api delete:', error);
      return false;
    }
  },
  // Function to get user by ID
  getUser : async (userId: number) => {
    try {
      const response = await fetch(`${apiEndpoint}/${userId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user with ID ${userId}`);
      }

      const user = await response.json();
      return user;

    } catch (error) {
      console.error('Error in api getById:', error);
      return null;
    }
  },
  // Function to edit User
  editUser: async (userId: number, user: Partial<NewUser>) => {
    try {
      const response = await fetch(`${apiEndpoint}/${userId}`, {
        method: 'PATCH', // También se podría usar PUT según la API
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(user),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to edit user with ID ${userId}`);
      }
  
      const updatedUser = await response.json();
      return updatedUser;
    } catch (error) {
      console.error('Error in api editUser:', error);
      return null;
    }
  },
  
};

export default api;

