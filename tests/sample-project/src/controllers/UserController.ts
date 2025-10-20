import { Request, Response } from 'express';
import { UserService } from '../services/UserService';
import { validateUser } from '../utils/validation';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const userData = req.body;
      
      // Validate user data
      const validationResult = validateUser(userData);
      if (!validationResult.isValid) {
        res.status(400).json({ error: validationResult.errors });
        return;
      }

      const newUser = await this.userService.createUser(userData);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create user' });
    }
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userData = req.body;
      
      const updatedUser = await this.userService.updateUser(parseInt(id), userData);
      if (!updatedUser) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
      
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Failed to update user' });
    }
  }
}
