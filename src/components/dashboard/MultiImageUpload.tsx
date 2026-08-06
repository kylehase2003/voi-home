import { useCallback, useState } from 'react';
import { Upload, X, GripVertical, Loader2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { compressImage } from '@/utils/imageCompression';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface MultiImageUploadProps {
  bucket: string;
  images: string[];
  onImagesChange: (urls: string[]) => void;
  maxImages?: number;
  accept?: string;
  maxSize?: number;
}

interface SortableImageProps {
  id: string;
  url: string;
  onRemove: () => void;
}

function SortableImage({ id, url, onRemove }: SortableImageProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative group"
    >
      <div className="relative aspect-square rounded-lg overflow-hidden border-2 border-border bg-muted">
        <img src={url} alt="" className="w-full h-full object-cover" loading="lazy" />
        
        {/* Drag Handle */}
        <div
          {...attributes}
          {...listeners}
          className="absolute top-2 left-2 p-1.5 bg-background/80 backdrop-blur rounded cursor-move opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <GripVertical className="h-4 w-4" />
        </div>

        {/* Remove Button */}
        <button
          type="button"
          onClick={onRemove}
          className="absolute top-2 right-2 p-1.5 bg-destructive text-destructive-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function MultiImageUpload({
  bucket,
  images,
  onImagesChange,
  maxImages = 15,
  accept = 'image/*',
  maxSize = 5,
}: MultiImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0 });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const uploadFile = async (file: File): Promise<string | null> => {
    try {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`);
        return null;
      }

      // Compress the image before upload with smaller dimensions for faster processing
      let fileToUpload: File;
      try {
        fileToUpload = await compressImage(file, 1600, 1200, 0.75);
      } catch (error) {
        console.error('Compression failed, using original file:', error);
        fileToUpload = file;
      }

      // Validate file size after compression
      if (fileToUpload.size > maxSize * 1024 * 1024) {
        toast.error(`File ${file.name} exceeds ${maxSize}MB limit after compression`);
        return null;
      }

      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.jpg`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, fileToUpload);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      return publicUrl;
    } catch (error: any) {
      console.error('Error uploading image:', error);
      toast.error(error.message || `Error uploading ${file.name}`);
      return null;
    }
  };

  const uploadMultipleFiles = async (files: FileList) => {
    setUploading(true);
    
    const remainingSlots = maxImages - images.length;
    const filesToUpload = Array.from(files).slice(0, remainingSlots);

    if (files.length > remainingSlots) {
      toast.info(`Only uploading ${remainingSlots} images due to limit of ${maxImages}`);
    }

    setUploadProgress({ current: 0, total: filesToUpload.length });

    // Process images sequentially to prevent browser overload
    const successfulUrls: string[] = [];
    
    for (let i = 0; i < filesToUpload.length; i++) {
      const file = filesToUpload[i];
      setUploadProgress({ current: i + 1, total: filesToUpload.length });
      
      // Small delay between uploads to prevent UI freezing
      if (i > 0) {
        await new Promise(resolve => setTimeout(resolve, 50));
      }
      
      const url = await uploadFile(file);
      if (url) {
        successfulUrls.push(url);
        // Update images immediately after each successful upload for better UX
        onImagesChange([...images, ...successfulUrls]);
      }
    }
    
    if (successfulUrls.length > 0) {
      toast.success(`${successfulUrls.length} image${successfulUrls.length > 1 ? 's' : ''} uploaded successfully`);
    }
    
    setUploadProgress({ current: 0, total: 0 });
    setUploading(false);
  };

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      uploadMultipleFiles(e.dataTransfer.files);
    }
  }, [images.length, maxImages]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      uploadMultipleFiles(e.target.files);
    }
    // Reset input value to allow re-selecting the same files
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = images.indexOf(active.id as string);
      const newIndex = images.indexOf(over.id as string);
      onImagesChange(arrayMove(images, oldIndex, newIndex));
    }
  };

  const canAddMore = images.length < maxImages;

  return (
    <div className="space-y-4">
      {/* Uploaded Images Grid with Drag and Drop Sorting */}
      {images.length > 0 && (
        <div>
          <p className="text-sm text-muted-foreground mb-3">
            {images.length} / {maxImages} images • Drag to reorder
          </p>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={images} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {images.map((url, index) => (
                  <SortableImage
                    key={url}
                    id={url}
                    url={url}
                    onRemove={() => removeImage(index)}
                  />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        </div>
      )}

      {/* Upload Area */}
      {canAddMore && (
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive
              ? 'border-primary bg-primary/10'
              : 'border-border hover:border-primary'
          } ${uploading ? 'opacity-70 cursor-wait' : 'cursor-pointer'}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleChange}
            disabled={uploading || !canAddMore}
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-wait"
          />
          
          {uploading ? (
            <>
              <Loader2 className="h-10 w-10 mx-auto mb-3 text-primary animate-spin" />
              <p className="text-sm font-medium mb-1">
                Uploading {uploadProgress.current} of {uploadProgress.total}...
              </p>
              <div className="w-full max-w-xs mx-auto bg-muted rounded-full h-2 mt-3">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(uploadProgress.current / uploadProgress.total) * 100}%` }}
                />
              </div>
            </>
          ) : (
            <>
              <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm font-medium mb-1">
                {images.length === 0 ? 'Upload Property Images' : 'Add More Images'}
              </p>
              <p className="text-xs text-muted-foreground mb-2">
                Drag and drop or <span className="text-primary underline">click to select</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Max {maxImages} images • Up to {maxSize}MB each
              </p>
            </>
          )}
        </div>
      )}

      {!canAddMore && (
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <p className="text-sm text-muted-foreground">
            Maximum of {maxImages} images reached
          </p>
        </div>
      )}
    </div>
  );
}