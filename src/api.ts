const apiKey = '0c2879943b7cbdbecda978af351d0ffbd39c3f8a7e6a446bdeba4134feb7abcc';
const apiEndpoint = 'https://gorest.co.in/public/v2/users';

// Simulating deelay
const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * ms));

const api = {
  // Function to get user list
  list: async () => {
    await sleep(2500);

    try {
      const response = await fetch(apiEndpoint, {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      return await response.json();
    } catch (error) {
      console.error('Error in api list:', error);
      return null;
    }
  },
};

export default api;

