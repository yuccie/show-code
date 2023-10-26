import fs from 'fs'

export function isDirectoryEmpty(path) {
  const files = fs.readdirSync(path);
  return files.length === 0;
}

export function isFolderExists(path) {
  // 这里必须用try catch，如果不是文件夹，则用catch 返回false
  try {
    const stats = fs.statSync(path);
    return stats.isDirectory();
  } catch (error) {
    // console.log('djch error', error.code, Object.keys(error))
    // 这里是error对象，有属性可以使用
    if (error.code === 'ENOENT') {
      return false;
    }
    throw error;
  }
}
