import * as FileSystem from 'expo-file-system';

/**
 * Copia una imagen desde una URI (por ejemplo, content:// o file://) a un directorio local
 * y devuelve la URI local. Si falla, devuelve la URI original.
 */
export async function copyImageToLocal(uri: string): Promise<string> {
  if (!uri) return uri;
  try {
    const fileName = `${Date.now()}.jpg`;
    const docDir = ((FileSystem as any).documentDirectory as string) || ((FileSystem as any).cacheDirectory as string) || '';
    const localUri = docDir + fileName;
    await FileSystem.copyAsync({ from: uri, to: localUri });
    return localUri;
  } catch (e) {
    // Fallback: devolver la URI original si no se puede copiar
    return uri;
  }
}
