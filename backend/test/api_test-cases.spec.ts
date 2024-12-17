import { test, expect } from '@playwright/test'
import Logger from '../../utils/LoggingUtils'
import RequestsSpec from '../utils/RequestsSpec'
import { Constants } from '../utils/constants'

let userID: string
let req: RequestsSpec

test.beforeAll(() => {
    req = new RequestsSpec()
})

test("get call", async ({ request }) => {
    try {
        Logger.info("Starting GET request to fetch users...")
        const response = await req.get(`${Constants.API_BASE_URL}/users?page=2`, request)
        
        Logger.debug(`Response Status: ${await response.status()}`)
        expect(response.status()).toBe(200)
        
        Logger.debug(`Response Body: ${await response.text()}`)
    } catch (error) {
        Logger.error(`Error in GET request: ${error.message}`)
        throw error
    }
})

test("post call", async ({ request }) => { 
    try {
        Logger.info("Starting POST request to create a new user...")
        const response = await req.post(`${Constants.API_BASE_URL}/users`, request)
        
        Logger.debug(`Response Status: ${response.status()}`)
        const res = await response.json()
        userID = await res.id
        
        Logger.debug(`Created user with ID: ${userID}`)
        expect(response.status()).toBe(201)
        
        Logger.debug(`Response Body: ${JSON.stringify(res)}`)
    } catch (error) {
        Logger.error(`Error in POST request: ${error.message}`)
        throw error
    }
})

test("put call", async ({ request }) => {
    try {
        Logger.info(`Starting PUT request to update user with ID: ${userID}...`)
        const response = await req.put(`${Constants.API_BASE_URL}/users/${userID}`, request)
        
        Logger.debug(`Response Status: ${response.status()}`)
        expect(response.status()).toBe(200)
        
        Logger.debug(`Response Body: ${await response.text()}`)
    } catch (error) {
        Logger.error(`Error in PUT request: ${error.message}`)
        throw error
    }
})

test("delete call", async ({ request }) => {
    try {
        Logger.info(`Starting DELETE request to delete user with ID: ${userID}...`)
        const response = await req.delete(`${Constants.API_BASE_URL}/users/${userID}`, request)
        
        Logger.debug(`Response Status: ${response.status()}`)
        expect(response.status()).toBe(204)
        
        Logger.debug(`Response Body: ${await response.text()}`)
    } catch (error) {
        Logger.error(`Error in DELETE request: ${error.message}`)
        throw error
    }
})
