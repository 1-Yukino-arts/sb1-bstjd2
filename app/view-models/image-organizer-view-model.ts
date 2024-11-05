import { Observable, File, ImageSource, knownFolders } from '@nativescript/core';
import { ImageItem, ImageCollection } from '../models/image-item';

export class ImageOrganizerViewModel extends Observable {
    private collection: ImageCollection;
    private _selectedImage: ImageItem | null = null;

    constructor() {
        super();
        this.collection = new ImageCollection();
    }

    get images(): ImageItem[] {
        return this.collection.getAllImages();
    }

    get selectedImage(): ImageItem | null {
        return this._selectedImage;
    }

    set selectedImage(value: ImageItem | null) {
        if (this._selectedImage !== value) {
            this._selectedImage = value;
            this.notifyPropertyChange('selectedImage', value);
        }
    }

    async addImage(imageSource: ImageSource) {
        const fileName = `image_${Date.now()}.jpg`;
        const folderPath = knownFolders.documents().path;
        const filePath = `${folderPath}/${fileName}`;
        
        await imageSource.saveToFile(filePath, "jpg");

        const newImage: ImageItem = {
            id: Date.now().toString(),
            uri: filePath,
            rotation: 0,
            scale: 1,
            opacity: 1,
            x: 0,
            y: 0,
            notes: ''
        };

        this.collection.addImage(newImage);
        this.notifyPropertyChange('images', this.images);
    }

    updateImage(id: string, updates: Partial<ImageItem>) {
        this.collection.updateImage(id, updates);
        this.notifyPropertyChange('images', this.images);
    }

    deleteImage(id: string) {
        const image = this.collection.getImage(id);
        if (image) {
            try {
                File.fromPath(image.uri).remove();
                this.collection.deleteImage(id);
                this.notifyPropertyChange('images', this.images);
            } catch (error) {
                console.error('Error deleting image:', error);
            }
        }
    }
}