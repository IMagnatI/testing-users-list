export default class UrlHelper {
  private static API_DEV_ADDRESS = '/api/'

  public static getFullApiUrl(path: string): string {
    return this.API_DEV_ADDRESS + path
  }
}
