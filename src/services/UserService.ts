import User from '../types/User'
import {v4 as uuid} from 'uuid'

export default class UserService {
    static async createUser() : Promise<User> {
        return {
            id: uuid(),
            username: 'lopezoscardev',
            firstName: 'Oscar',
            lastName: 'López'
        }
    }

    static async getUsers (): Promise<User[]> {
        const newUser = {
            id: uuid(),
            username: 'lopezoscardev',
            firstName: 'Oscar',
            lastName: 'López'
        }
        return [newUser]
    }
}