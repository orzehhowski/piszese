"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadPhoto, deletePhoto, renamePhoto } from "./actions";
import { Trash2, Upload, Loader2, Copy, Check, Edit2, Save, X } from "lucide-react";

export default function PhotoManager({ initialPhotos }: { initialPhotos: string[] }) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  
  // Renaming state
  const [editingPhoto, setEditingPhoto] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await uploadPhoto(formData);
      if (result.error) {
        alert(result.error);
      } else if (result.fileName) {
        if (!photos.includes(result.fileName)) {
          setPhotos(prev => [...prev, result.fileName]);
        }
      }
    } catch (error) {
      alert("Błąd podczas przesyłania zdjęcia");
    } finally {
      setUploading(false);
      e.target.value = ""; // Reset input
    }
  }

  async function handleDelete(fileName: string) {
    if (!confirm(`Czy na pewno chcesz usunąć ${fileName}?`)) return;

    setDeleting(fileName);
    try {
      const result = await deletePhoto(fileName);
      if (result.error) {
        alert(result.error);
      } else {
        setPhotos(prev => prev.filter(p => p !== fileName));
      }
    } catch (error) {
      alert("Błąd podczas usuwania zdjęcia");
    } finally {
      setDeleting(null);
    }
  }

  async function handleRename() {
    if (!editingPhoto || !editName || editName === editingPhoto) {
      setEditingPhoto(null);
      return;
    }

    setIsRenaming(true);
    try {
      const result = await renamePhoto(editingPhoto, editName);
      if (result.error) {
        alert(result.error);
      } else if (result.newName) {
        setPhotos(prev => prev.map(p => p === editingPhoto ? result.newName! : p));
        setEditingPhoto(null);
      }
    } catch (error) {
      alert("Błąd podczas zmiany nazwy");
    } finally {
      setIsRenaming(false);
    }
  }

  function startEditing(photo: string) {
    setEditingPhoto(photo);
    setEditName(photo);
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Twoje zdjęcia</h2>
        <label className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors">
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          Dodaj zdjęcie
          <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} accept="image/*" />
        </label>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {photos.map((photo) => (
          <div key={photo} className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 transition-all hover:border-zinc-700">
            <div className="relative aspect-square">
              <Image
                src={`/fotka/${photo}`}
                alt={photo}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            </div>
            <div className="p-3">
              {editingPhoto === photo ? (
                <div className="mb-2 flex gap-1">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") handleRename();
                      if (e.key === "Escape") setEditingPhoto(null);
                    }}
                    className="w-full rounded border border-zinc-700 bg-zinc-800 px-2 py-1 text-xs text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
                    autoFocus
                  />
                  <button
                    onClick={handleRename}
                    disabled={isRenaming}
                    className="flex h-7 w-7 items-center justify-center rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    {isRenaming ? <Loader2 className="h-3 w-3 animate-spin" /> : <Save className="h-3 w-3" />}
                  </button>
                  <button
                    onClick={() => setEditingPhoto(null)}
                    className="flex h-7 w-7 items-center justify-center rounded bg-zinc-700 text-white hover:bg-zinc-600"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ) : (
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="truncate text-xs font-medium text-zinc-400" title={photo}>
                    {photo}
                  </p>
                  <button
                    onClick={() => startEditing(photo)}
                    className="text-zinc-500 hover:text-white"
                  >
                    <Edit2 className="h-3 w-3" />
                  </button>
                </div>
              )}
              
              <div className="flex gap-2">
                <button
                  onClick={() => copyToClipboard(`/fotka/${photo}`)}
                  className="flex flex-1 items-center justify-center gap-1 rounded-md bg-zinc-800 py-1.5 text-[10px] font-medium text-white hover:bg-zinc-700"
                >
                  {copied === `/fotka/${photo}` ? (
                    <>
                      <Check className="h-3 w-3 text-green-500" />
                      Skopiowano
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Kopiuj URL
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDelete(photo)}
                  disabled={deleting === photo}
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-red-900/20 text-red-500 hover:bg-red-900/40 disabled:opacity-50"
                >
                  {deleting === photo ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        ))}
        {photos.length === 0 && (
          <div className="col-span-full py-12 text-center text-zinc-500">
            Brak zdjęć w galerii.
          </div>
        )}
      </div>
    </div>
  );
}
