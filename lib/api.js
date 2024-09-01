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

export async function getStories(where = {}, offset = 0, limit = 15, orderBy = {}) {
    try {
        const response = await axios.get(`/api/stories`, {
            params: {
                where: JSON.stringify(where),
                offset: String(offset),
                limit: String(limit),
                orderBy: JSON.stringify(orderBy)
            }
        });
        return response.data.stories;
    } catch (error) {
        console.error("Error while fetching user stories", error);
        throw error;
    }
}