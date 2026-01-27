import { readJson, writeJson } from '../Agents/DBAccess.js';

const fileKey = 'media';

export const createMedia = async (mediaData) => {
  try {
    const media = await readJson(fileKey);

    const newMedia = {
      mediaId: mediaData.mediaId,
      type: mediaData.type,
      url: mediaData.url,
      createdAt: mediaData.createdAt,
    };

    media.push(newMedia);
    await writeJson(fileKey, media);

    return newMedia;
  } catch (error) {
    throw error;
  }
};
