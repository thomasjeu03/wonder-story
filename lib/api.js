import axios from 'axios';

const URL = process.env.NODE_ENV === "development" ? process.env.NEXT_URL_DEVELOPMENT : process.env.NEXT_URL_PRODUCTION

export async function getStoryById(id) {
    try {
        const response = await axios.get(`${URL}/api/story/${id}`);
        return response.data.story;
    } catch (error) {
        console.error("Erreur lors de la récupération des données de l'histoire", error);
        throw error;
    }
}