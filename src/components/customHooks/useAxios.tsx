import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { ISendAxiosRequest } from "../../types/types";

export default function useAxios(enableCache: boolean = false,name="") {
    const apiLink = import.meta.env.VITE_API_LINK as string
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cache, setCache] = useState<{ [key: string]: AxiosResponse }>({})

    const sendAxiosRequest = async ({ path, method, body = {}, token = undefined }: ISendAxiosRequest): Promise<AxiosResponse> => {
        try {
            if (enableCache && method === "GET" && cache[path]) {
                setData(cache[path].data);
                setIsLoading(false);
                return cache[path]
            }
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
            console.log("did not get cached" + name)
            setData(response.data)

            if (method === "GET") {
                setCache(prevCache =>
                    ({ ...prevCache, [path]: response.data }))
            }

            return response;
        } catch (error) {
            throw new Error(`Error has occurred with api : ${error}`)
        } finally {
            setIsLoading(false)
        }
    }
    const GET = (path: string, token = undefined) => sendAxiosRequest({ path, method: "GET", body: {}, token });
    const POST = (path: string, body: object, token = undefined) => sendAxiosRequest({ path, method: "POST", body, token });
    const PATCH = (path: string, body: object, token = undefined) => sendAxiosRequest({ path, method: "PATCH", body, token });
    const DELETE = (path: string, body: object, token = undefined) => sendAxiosRequest({ path, method: "DELETE", body, token });
    const PUT = (path: string, body: object, token = undefined) => sendAxiosRequest({ path, method: "PUT", body, token });

    return { DELETE, GET, POST, PUT, PATCH, isLoading, setIsLoading, data };
}