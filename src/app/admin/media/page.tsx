"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface Media {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  altText: string | null;
  createdAt: string;
}

export default function MediaPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      const res = await fetch("/api/admin/media");
      const data = await res.json();
      if (data.success) {
        setMedia(data.data);
      }
    } catch (error) {
      console.error("Error fetching media:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("/api/admin/media", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (data.success) {
          setMedia((prev) => [data.data, ...prev]);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    setIsUploading(false);
    e.target.value = "";
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-light text-slate-900">Media Library</h1>
          <p className="text-slate-500 mt-1">Upload and manage images</p>
        </div>
        <label className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer">
          {isUploading ? "Uploading..." : "+ Upload Files"}
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      </div>

      {media.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedMedia(item)}
              className="aspect-square bg-slate-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-slate-900 transition-all"
            >
              {item.mimeType.startsWith("image/") ? (
                <Image
                  src={item.url}
                  alt={item.altText || item.originalName}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl">
                  📄
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
          <span className="text-5xl mb-4 block">🖼️</span>
          <h2 className="text-xl font-medium text-slate-900 mb-2">No media yet</h2>
          <p className="text-slate-500 mb-6">
            Upload images to use in your products and pages.
          </p>
          <label className="px-6 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer inline-block">
            Upload Files
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
            />
          </label>
        </div>
      )}

      {/* Media Detail Modal */}
      {selectedMedia && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedMedia(null)}
        >
          <div
            className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-medium text-slate-900">Media Details</h2>
                <button
                  onClick={() => setSelectedMedia(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ✕
                </button>
              </div>

              <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden mb-6">
                {selectedMedia.mimeType.startsWith("image/") ? (
                  <Image
                    src={selectedMedia.url}
                    alt={selectedMedia.altText || selectedMedia.originalName}
                    width={600}
                    height={400}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-6xl">
                    📄
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    File Name
                  </label>
                  <p className="text-slate-900">{selectedMedia.originalName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    URL
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 bg-slate-100 rounded text-sm text-slate-700 overflow-auto">
                      {selectedMedia.url}
                    </code>
                    <button
                      onClick={() => copyToClipboard(selectedMedia.url)}
                      className="px-3 py-2 bg-slate-200 rounded hover:bg-slate-300 transition-colors text-sm"
                    >
                      Copy
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">
                      Type
                    </label>
                    <p className="text-slate-900">{selectedMedia.mimeType}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1">
                      Size
                    </label>
                    <p className="text-slate-900">{formatFileSize(selectedMedia.size)}</p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1">
                    Uploaded
                  </label>
                  <p className="text-slate-900">
                    {new Date(selectedMedia.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
