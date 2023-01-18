from os import getenv
from typing import NoReturn


class EnvVariableUndefined(Exception):
    """Raise when cannot read env variable and getenv return None"""

    def __init__(self, env_name: str) -> None:
        msg = f'Env name="{env_name}"'
        super().__init__(msg)


def get_bool_env(env_name: str) -> bool | NoReturn:
    env = getenv(env_name, None)
    if env is None:
        raise EnvVariableUndefined(env_name)
    return env.lower() in ('true', '1')


def get_str_env(env_name: str) -> str | NoReturn:
    env = getenv(env_name, None)
    if env is None:
        raise EnvVariableUndefined(env_name)
    return env


DEBUG: bool = get_bool_env('DEBUG')
SECRET_AUTH_KEY: str = get_str_env('SECRET_AUTH_KEY')
DB_USER: str = get_str_env('DB_USER')
DB_PORT: str = get_str_env('DB_PORT')
DB_PASS: str = get_str_env('DB_PASS')
DB_NAME: str = get_str_env('DB_NAME')
DB_HOST: str = get_str_env('DB_HOST')
