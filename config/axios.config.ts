import axios, { AxiosInstance } from "axios";

const headerConfig = {
  "Content-Type": "application/json",
  "app-id": "6595e44238b49c06adc610c5"
}

export const httpInstance: AxiosInstance = axios.create({
  baseURL: "https://dummyapi.io/data/v1/",
  timeout: 30000,
  headers: headerConfig,
})