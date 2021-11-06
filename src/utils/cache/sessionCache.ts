export default {
  MODULE_KEY: 'blog',
  setCache(key: string, value: string): void {
    const cache = this.getModuleCache();
    cache[key] = value;
    window.sessionStorage.setItem(this.MODULE_KEY, JSON.stringify(cache));
  },
  getCache(key: string): string {
    return this.getModuleCache()[key];
  },
  getModuleCache(): any {
    return JSON.parse(window.sessionStorage.getItem(this.MODULE_KEY) || '{}');
  },
  clear(key?: string): void {
    let cache = this.getModuleCache();
    if (key) delete cache[key];
    else cache = '{}';
    window.sessionStorage.setItem(this.MODULE_KEY, JSON.stringify(cache));
  },
};
