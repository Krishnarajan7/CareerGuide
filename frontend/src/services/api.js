const API_BASE_URL = 'http://localhost:5000/api';

class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function handleResponse(response) {
  const data = await response.json();
  
  if (!response.ok) {
    throw new ApiError(
      data.message || 'An error occurred',
      response.status,
      data
    );
  }
  
  return data;
}

export const collegeApi = {
  // Search colleges with query parameters
  async searchColleges(query, type, location, limit = 10) {
    try {
      const params = new URLSearchParams();
      if (query) params.append('q', query);
      if (type) params.append('type', type);
      if (location) params.append('location', location);
      if (limit) params.append('limit', limit);
      
      const response = await fetch(`${API_BASE_URL}/colleges/search?${params}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Error searching colleges:', error);
      throw error;
    }
  },

  // Smart search: tries /search first, then falls back to /colleges?search=
  async searchSmart(query, type, location, limit = 10) {
    const first = await this.searchColleges(query, type, location, limit);
    if (first?.success && Array.isArray(first.data) && first.data.length > 0) return first;
    // Fallback to generic filter
    const alt = await this.getAllColleges(query, type, location, limit, 0);
    return alt;
  },

  // Get all colleges with optional filters
  async getAllColleges(search, type, location, limit = 20, offset = 0) {
    try {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (type) params.append('type', type);
      if (location) params.append('location', location);
      if (limit) params.append('limit', limit);
      if (offset) params.append('offset', offset);
      
      const response = await fetch(`${API_BASE_URL}/colleges?${params}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching colleges:', error);
      throw error;
    }
  },

  // Get college by ID
  async getCollegeById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/colleges/${id}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching college:', error);
      throw error;
    }
  },

  // Get popular colleges (for search suggestions)
  async getPopularColleges(limit = 6) {
    try {
      const response = await fetch(`${API_BASE_URL}/colleges?limit=${limit}`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Error fetching popular colleges:', error);
      throw error;
    }
  },

  // Enrich college details from public datasets
  async enrichCollegeById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/colleges/${id}/enrich`);
      return await handleResponse(response);
    } catch (error) {
      console.error('Error enriching college:', error);
      throw error;
    }
  }
};

export default collegeApi;

