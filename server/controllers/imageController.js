import axios from 'axios';
import FormData from 'form-data';
import userModel from '../models/userModel.js';

export const generateImageController = async (req, res) => {
  try {
    const { prompt, userId } = req.body;
    if (!prompt || !userId) {
      return res.json({ success: false, message: 'Missing Details' });
    }

    const user = await userModel.findById(userId);
    if (!user || user.creditBalance <= 0) {
      return res.json({ success: false, message: 'No Credit Balance' });
    }

    const formData = new FormData();
    formData.append('prompt', prompt);

    const response = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formData,
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_API,
          ...formData.getHeaders(),
        },
        responseType: 'arraybuffer',
      }
    );

    const base64Image = Buffer.from(response.data, 'binary').toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`;

    // Deduct user credit
    user.creditBalance -= 1;
    await user.save();

    res.json({
      success: true,
      resultImage,
      creditBalance: user.creditBalance,
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
