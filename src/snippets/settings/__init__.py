import os

ENV = os.getenv('ENV', 'dev')

if ENV == 'dev':
    from .dev import *
elif ENV == 'prod':
    from .production import *