export interface ImageItem {
    id: string;
    uri: string;
    rotation: number;
    scale: number;
    opacity: number;
    x: number;
    y: number;
    notes: string;
}

export class ImageCollection {
    private items: Map<string, ImageItem> = new Map();

    addImage(item: ImageItem) {
        this.items.set(item.id, item);
    }

    getImage(id: string): ImageItem | undefined {
        return this.items.get(id);
    }

    getAllImages(): ImageItem[] {
        return Array.from(this.items.values());
    }

    updateImage(id: string, updates: Partial<ImageItem>) {
        const item = this.items.get(id);
        if (item) {
            this.items.set(id, { ...item, ...updates });
        }
    }

    deleteImage(id: string) {
        this.items.delete(id);
    }
}