import Logger from '../../utils/LoggingUtils'
import { APIRequestContext } from '@playwright/test'

class RequestsSpec {

    async get(url: string, request) {
        try {
            Logger.info(`Starting GET request for ${url}`)
            const response = await request.get(url)
            Logger.debug(`GET request to ${url} - Status: ${response.status()}`)
            return response
        } catch (error) {
            Logger.error(`GET request failed for ${url}: ${error.message}`)
            throw error
        }
    }

    async post(url: string, request) {
        try {
            Logger.info(`Starting POST request for ${url}`)
            const response = await request.post(url, {
                headers: { 'content-type': 'application/json' },
                data: JSON.stringify({
                    "name": "morpheus",
                    "job": "leader"
                })
            })
            Logger.debug(`POST request to ${url} - Status: ${response.status()}`)
            const res = await response.json()
            Logger.debug(`Response Body: ${JSON.stringify(res)}`)
            return response
        } catch (error) {
            Logger.error(`POST request failed for ${url}: ${error.message}`)
            throw error
        }
    }

    async put(url: string, request) {
        try {
            Logger.info(`Starting PUT request for ${url}`)
            const response = await request.put(url, {
                headers: { 'content-type': 'application/json' },
                data: JSON.stringify({
                    "name": "morpheus",
                    "job": "zion resident"
                })
            })
            Logger.debug(`PUT request to ${url} - Status: ${response.status()}`)
            const res = await response.json()
            Logger.debug(`Response Body: ${JSON.stringify(res)}`)
            return response
        } catch (error) {
            Logger.error(`PUT request failed for ${url}: ${error.message}`)
            throw error
        }
    }

    async delete(url: string, request) {
        try {
            Logger.info(`Starting DELETE request for ${url}`)
            const response = await request.delete(url)
            Logger.debug(`DELETE request to ${url} - Status: ${response.status()}`)
            return response
        } catch (error) {
            Logger.error(`DELETE request failed for ${url}: ${error.message}`)
            throw error
        }
    }
}

export default RequestsSpec
