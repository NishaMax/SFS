'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

interface ImageUploadProps {
  currentImage?: string;
  onImageUploaded: (url: string) => void;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export default function ImageUpload({ currentImage, onImageUploaded, size = 'md', label }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImage || '');
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const sizeClasses = {
    sm: 'w-16 h-16 rounded-xl',
    md: 'w-24 h-24 rounded-2xl',
    lg: 'w-full aspect-video rounded-2xl',
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError('');

    // Client-side preview
    const reader = new FileReader();
    reader.onload = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);

    // Upload to Supabase Storage
    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('sfs-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('sfs-images').getPublicUrl(filePath);

      setPreview(data.publicUrl);
      onImageUploaded(data.publicUrl);
    } catch (err: any) {
      setError(err.message || 'Upload failed. Please try again.');
      setPreview(currentImage || '');
    }
    setUploading(false);
  };

  return (
    <div>
      {label && <label className="text-sm text-gray-400 mb-2 block">{label}</label>}
      <div
        onClick={() => inputRef.current?.click()}
        className={`${sizeClasses[size]} relative overflow-hidden bg-gray-800 border-2 border-dashed border-gray-600 hover:border-green-500/50 transition-colors cursor-pointer flex items-center justify-center group`}
      >
        {preview ? (
          <>
            <Image src={preview} alt="Upload" fill className="object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <span className="text-white text-xs font-medium">Change</span>
            </div>
          </>
        ) : (
          <div className="text-center p-2">
            {uploading ? (
              <div className="w-6 h-6 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin mx-auto" />
            ) : (
              <>
                <span className="text-xl block">📷</span>
                <span className="text-[10px] text-gray-500 mt-1 block">Upload</span>
              </>
            )}
          </div>
        )}
        
        {uploading && preview && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <div className="w-6 h-6 border-2 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
          </div>
        )}
      </div>

      {error && <p className="text-red-400 text-[10px] mt-1">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/svg+xml,image/gif"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
