from typing import List, Optional
import json
from datetime import datetime

class UserService:
    """Service for managing users"""
    
    def __init__(self):
        self.users = []
    
    def create_user(self, name: str, email: str) -> dict:
        """Create a new user"""
        user = {
            'id': len(self.users) + 1,
            'name': name,
            'email': email,
            'created_at': datetime.now().isoformat()
        }
        self.users.append(user)
        return user
    
    def get_user(self, user_id: int) -> Optional[dict]:
        """Get user by ID"""
        for user in self.users:
            if user['id'] == user_id:
                return user
        return None
    
    def list_users(self) -> List[dict]:
        """Get all users"""
        return self.users.copy()
    
    def export_users(self) -> str:
        """Export users as JSON"""
        return json.dumps(self.users, indent=2)

def validate_email(email: str) -> bool:
    """Validate email format"""
    return '@' in email and '.' in email.split('@')[1]
