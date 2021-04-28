import axios from 'axios';

export default class API {
  private static API = process.env.NODE_ENV === 'development' ? process.env.DEV : process.env.PROD;

  public static async health(setIsLoading): Promise<unknown> {
    try {
      const resp = await axios.get(`${this.API}/health`);
      setIsLoading(false);
      return resp;
    } catch (error) {
      throw new Error(error);
    }
  }

  public static async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<unknown> {
    try {
      return axios.post(
        `${this.API}/login`,
        {},
        {
          auth: {
            username: email,
            password,
          },
        },
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
