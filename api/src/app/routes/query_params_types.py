from enum import Enum


class ThemesType(str, Enum):
    SAVED = 'saved'
    SHOWN = 'shown'


class OrderAscending(str, Enum):
    ASC = 'asc'
    DESC = 'desc'


class ThemesFilterBy(str, Enum):
    ALL = 'all'
    TITLE = 'title'
    DESCRIPTION = 'description'
