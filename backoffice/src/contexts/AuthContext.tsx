import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const fetchPackages = async (regionId: number, token: string) => {
    const response = await axios.get(`${API_URL}/${regionId}/packages`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.packages; // Retourne uniquement les packages
};


export const fetchRegion = async (regionId: number, token: string) => {
    const response = await axios.get(`${API_URL}/${regionId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.sites; // Retourne uniquement les sites
};
export const fetchSites = async (regionId: number, token: string) => {
    const response = await axios.get(`${API_URL}/${regionId}/sites`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.sites; // Retourne uniquement les sites
};

export const addSite = async (regionId: number, siteData: { name: string; url: string; description: string }, token: string) => {
    const response = await axios.post(`${API_URL}/${regionId}/sites`, siteData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.site;
};

export const deleteSite = async (regionId: number, siteId: number, token: string) => {
    await axios.delete(`${API_URL}/${regionId}/sites/${siteId}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};