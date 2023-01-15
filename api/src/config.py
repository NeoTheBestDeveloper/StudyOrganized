from os import getenv

DEBUG: bool = getenv('DEBUG', 'false').lower() in ('true', '1')
SECRET_KEY: str = getenv('SECRET_KEY', '')
DB_USER: str = getenv('DB_USER', '')
DB_PORT: str = getenv('DB_PORT', '')
DB_PASS: str = getenv('DB_PASS', '')
DB_NAME: str = getenv('DB_NAME', '')
DB_HOST: str = getenv('DB_HOST', '')
