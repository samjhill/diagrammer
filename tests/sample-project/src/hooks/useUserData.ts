import { useState, useEffect, useCallback } from 'react';
import { UserApi } from '../api/UserApi';
import { EventBus } from '../events/EventBus';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UseUserDataReturn {
  users: User[];
  loading: boolean;
  error: string | null;
  createUser: (userData: CreateUserRequest) => Promise<void>;
  updateUser: (id: number, userData: UpdateUserRequest) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  refreshUsers: () => Promise<void>;
}

interface CreateUserRequest {
  name: string;
  email: string;
}

interface UpdateUserRequest {
  name?: string;
  email?: string;
}

export const useUserData = (): UseUserDataReturn => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const userApi = new UserApi();
  const eventBus = EventBus.getInstance();

  // Load users on mount
  useEffect(() => {
    loadUsers();
  }, []);

  // Listen for user events
  useEffect(() => {
    const handleUserCreated = (user: User) => {
      setUsers(prev => [...prev, user]);
    };

    const handleUserUpdated = (updatedUser: User) => {
      setUsers(prev => 
        prev.map(user => 
          user.id === updatedUser.id ? updatedUser : user
        )
      );
    };

    const handleUserDeleted = (data: { userId: number }) => {
      setUsers(prev => prev.filter(user => user.id !== data.userId));
    };

    // Subscribe to events
    eventBus.onUserCreated(handleUserCreated);
    eventBus.onUserUpdated(handleUserUpdated);
    eventBus.onUserDeleted(handleUserDeleted);

    // Cleanup subscriptions
    return () => {
      eventBus.removeListener('user:created', handleUserCreated);
      eventBus.removeListener('user:updated', handleUserUpdated);
      eventBus.removeListener('user:deleted', handleUserDeleted);
    };
  }, [eventBus]);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const userData = await userApi.getUsers();
      setUsers(userData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [userApi]);

  const createUser = useCallback(async (userData: CreateUserRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const newUser = await userApi.createUser(userData);
      // Event will be emitted by the API layer
      setUsers(prev => [...prev, newUser]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create user');
    } finally {
      setLoading(false);
    }
  }, [userApi]);

  const updateUser = useCallback(async (id: number, userData: UpdateUserRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const updatedUser = await userApi.updateUser(id, userData);
      // Event will be emitted by the API layer
      setUsers(prev => 
        prev.map(user => 
          user.id === id ? updatedUser : user
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update user');
    } finally {
      setLoading(false);
    }
  }, [userApi]);

  const deleteUser = useCallback(async (id: number) => {
    setLoading(true);
    setError(null);
    
    try {
      await userApi.deleteUser(id);
      // Event will be emitted by the API layer
      setUsers(prev => prev.filter(user => user.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete user');
    } finally {
      setLoading(false);
    }
  }, [userApi]);

  const refreshUsers = useCallback(async () => {
    await loadUsers();
  }, [loadUsers]);

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    refreshUsers
  };
};
