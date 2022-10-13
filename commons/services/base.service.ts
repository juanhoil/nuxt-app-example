
import Api from "./api";


export class BaseService<T> extends Api {

  protected url: string;

  constructor(endPoint: string) {
    super()
    this.url = `${endPoint}`;
    this.http.interceptors.request.use((config) => config, (error) => Promise.reject(error));
    this.http.interceptors.response.use((response) => response, (error) => Promise.reject(error));
  }

  public getMany<GM>(query: string = ''): Promise<GM> {
    return this.http.get<GM>(`${this.url}/?${query}`).then(response => response.data).catch(err => err.message);
  }

  public getOne(id: number | string, query: string = ''): Promise<T> {
    return this.http.get<T>(`${this.url}/${id}/?${query}`).then(response => response.data).catch(err => err.message);
  }

  public saveOne(object: T, query: string = ''): Promise<T> {
    return this.http.post<T>(`${this.url}/?${query}`, object).then(response => response.data).catch(err => err.message);
  }

  public updateOne(id: number | string, object: T, query: string = ''): Promise<T> {
    return this.http.put<T>(`${this.url}/${id}/?${query}`, object).then(response => response.data).catch(err => err.message);
  }

  public deleteOne(id: number | string) {
    return this.http.delete<T>(`${this.url}/${id}`).then(response => response.data).catch(err => err.message);
  }

}
