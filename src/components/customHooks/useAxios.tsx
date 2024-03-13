import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { ISendAxiosRequest } from "../../types/types";

export default function useAxios() {
    const apiLink = import.meta.env.VITE_API_LINK as string
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const sendAxiosRequest = async ({ path, method, body = {}, token = undefined }: ISendAxiosRequest): Promise<AxiosResponse> => {
        try {
            const config = {
                method,
                url: apiLink + path,
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
                data: body || undefined
            }

            const response = await axios(config);

            setData(response.data)
            return response;
        } catch (error) {
            setIsLoading(false)
            throw new Error(`Error has occurred with api : ${error}`)
        } finally {
            setIsLoading(false)
        }
    }
    const GET = (path: string, token = undefined) => sendAxiosRequest({ path, method: "GET", body: {}, token});
    const POST = (path: string, body: object, token = undefined) => sendAxiosRequest({ path, method: "POST", body, token});
    const PATCH = (path: string, body: object, token = undefined) => sendAxiosRequest({ path, method: "PATCH", body, token});
    const DELETE = (path: string, body: object, token = undefined) => sendAxiosRequest({ path, method: "DELETE", body, token});
    const PUT = (path: string, body: object, token = undefined) => sendAxiosRequest({ path, method: "PUT", body, token});

    return { DELETE, GET, POST, PUT, PATCH, isLoading,setIsLoading, data };
}