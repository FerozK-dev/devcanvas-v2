import fs from 'fs';
import path from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { File } from './types';

class StorageService {
  constructor() {
    if (process.env.STORAGE_TYPE === 'cloud') {
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
    }
  }

  async upload(file: File, folder: string = 'uploads'): Promise<string> {
    if (process.env.STORAGE_TYPE === 'cloud') {
      return this.uploadToCloudinary(file, folder);
    } else {
      return this.saveLocally(file, folder);
    }
  }

  private async uploadToCloudinary(file: File, folder: string): Promise<string> {
    const result = await cloudinary.uploader.upload(file.path, {
      folder,
      public_id: `${Date.now()}-${file.originalname}`,
    });
    return result.secure_url;
  }

  private async saveLocally(file: File, folder: string): Promise<string> {
    // Store files in public directory
    const publicDir = path.join(__dirname, '../../public');
    const uploadDir = path.join(publicDir, 'storage', folder);

    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    // Sanitize filename
    const sanitizedName = file.originalname.replace(/[^\w.-]/g, '-');
    const fileName = `${Date.now()}-${sanitizedName}`;
    const filePath = path.join(uploadDir, fileName);

    // Write file
    if (file.buffer) {
        await fs.promises.writeFile(filePath, file.buffer);
    } else {
        await fs.promises.rename(file.path, filePath);
    }

    // Return URL-accessible path (without 'public' in path)
    return `/storage/${folder}/${fileName}`;
  }

  async delete(url: string): Promise<void> {
    if (process.env.STORAGE_TYPE === 'cloud') {
      const publicId = url.split('/').pop()?.split('.')[0];
      if (publicId) await cloudinary.uploader.destroy(publicId);
    } else {
      const filePath = path.join(__dirname, '../../public/', url);
      if (fs.existsSync(filePath)) {
        await fs.promises.unlink(filePath);
      }
    }
  }
}

export default new StorageService();
