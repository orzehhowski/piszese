"use server";

import fs from "node:fs/promises";
import path from "node:path";
import { revalidatePath } from "next/cache";

const PHOTOS_DIR = path.join(process.cwd(), "public", "fotka");
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];

async function exists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

export async function getPhotos() {
  try {
    const files = await fs.readdir(PHOTOS_DIR);
    return files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return ALLOWED_EXTENSIONS.includes(ext);
    });
  } catch (error) {
    console.error("Error reading photos directory:", error);
    return [];
  }
}

export async function uploadPhoto(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) {
    return { error: "Brak pliku" };
  }

  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return { error: `Nieobsługiwany format pliku: ${ext}. Dozwolone: ${ALLOWED_EXTENSIONS.join(", ")}` };
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // Simple filename sanitization
  const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
  const filePath = path.join(PHOTOS_DIR, safeName);

  if (await exists(filePath)) {
    return { error: "Plik o tej nazwie już istnieje" };
  }

  try {
    await fs.writeFile(filePath, buffer);
    revalidatePath("/admin/photos");
    return { success: true, fileName: safeName };
  } catch (error) {
    console.error("Upload error:", error);
    return { error: "Błąd podczas zapisu pliku" };
  }
}

export async function deletePhoto(fileName: string) {
  const safeName = path.basename(fileName);
  const filePath = path.join(PHOTOS_DIR, safeName);

  try {
    await fs.unlink(filePath);
    revalidatePath("/admin/photos");
    return { success: true };
  } catch (error) {
    console.error("Error deleting photo:", error);
    return { error: "Błąd podczas usuwania pliku" };
  }
}

export async function renamePhoto(oldName: string, newName: string) {
  const safeOldName = path.basename(oldName);
  let safeNewName = path.basename(newName).replace(/[^a-zA-Z0-9.-]/g, "_");
  
  // Ensure extension is preserved or valid if changed
  const oldExt = path.extname(safeOldName).toLowerCase();
  const newExt = path.extname(safeNewName).toLowerCase();
  
  if (!newExt) {
    safeNewName += oldExt;
  } else if (!ALLOWED_EXTENSIONS.includes(newExt)) {
    return { error: `Nieobsługiwany format pliku: ${newExt}` };
  }

  if (safeOldName === safeNewName) {
    return { success: true };
  }

  const oldPath = path.join(PHOTOS_DIR, safeOldName);
  const newPath = path.join(PHOTOS_DIR, safeNewName);

  if (await exists(newPath)) {
    return { error: "Plik o nowej nazwie już istnieje" };
  }

  try {
    await fs.rename(oldPath, newPath);
    revalidatePath("/admin/photos");
    return { success: true, newName: safeNewName };
  } catch (error) {
    console.error("Rename error:", error);
    return { error: "Błąd podczas zmiany nazwy" };
  }
}
