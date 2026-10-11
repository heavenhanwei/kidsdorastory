"""Server-only cloud settings. Secrets live outside the project, never in the browser."""
from pathlib import Path
from urllib.parse import urlsplit
import os, json, ctypes
from ctypes import wintypes

CONFIG_DIR = Path(os.environ.get('LOCALAPPDATA', str(Path.home()/'.config'))) / 'DuolaStorybook'
CONFIG_FILE = CONFIG_DIR / 'cloud.json'
DEFAULT_BASE = 'https://dashscope.aliyuncs.com/compatible-mode/v1'
DEFAULT_MODEL = 'qwen3.8-flash'

def check_url(value):
    p=urlsplit(value)
    if p.scheme!='https' or not p.hostname or p.username or p.password or p.query or p.fragment:
        raise ValueError('Use an HTTPS API base URL without credentials or query parameters.')
    return value.rstrip('/')

class Blob(ctypes.Structure):
    _fields_=[('size',wintypes.DWORD),('data',ctypes.POINTER(ctypes.c_ubyte))]

def protect(value, decrypt=False):
    if os.name!='nt': return value
    buffer=ctypes.create_string_buffer(value)
    source=Blob(len(value),ctypes.cast(buffer,ctypes.POINTER(ctypes.c_ubyte)));target=Blob()
    fn=ctypes.windll.crypt32.CryptUnprotectData if decrypt else ctypes.windll.crypt32.CryptProtectData
    fn.argtypes=[ctypes.POINTER(Blob),ctypes.c_void_p,ctypes.c_void_p,ctypes.c_void_p,ctypes.c_void_p,wintypes.DWORD,ctypes.POINTER(Blob)]
    fn.restype=wintypes.BOOL
    if not fn(ctypes.byref(source),None,None,None,None,1,ctypes.byref(target)):raise OSError('Unable to access encrypted credentials.')
    try:return ctypes.string_at(target.data,target.size)
    finally:
        ctypes.windll.kernel32.LocalFree.argtypes=[ctypes.c_void_p]
        ctypes.windll.kernel32.LocalFree.restype=ctypes.c_void_p
        ctypes.windll.kernel32.LocalFree(target.data)

def load_config():
    key=os.environ.get('DUOLA_API_KEY','').strip()
    if key:
        return {'api_key':key,'base_url':check_url(os.environ.get('DUOLA_BASE_URL',DEFAULT_BASE)),'model':os.environ.get('DUOLA_CLOUD_MODEL',DEFAULT_MODEL).strip()}
    if not CONFIG_FILE.exists():return None
    data=json.loads(CONFIG_FILE.read_text(encoding='utf-8'))
    key=bytes.fromhex(data['protected_key'])
    key=protect(key,True).decode('utf-8')
    return {'api_key':key,'base_url':check_url(data['base_url']),'model':data['model']}

def save_config(base_url,model,key):
    base_url=check_url(base_url)
    if not model.strip() or not key.strip():raise ValueError('Model and key are required.')
    CONFIG_DIR.mkdir(parents=True,exist_ok=True)
    if os.name!='nt':os.chmod(CONFIG_DIR,0o700)
    data={'base_url':base_url,'model':model.strip(),'protected_key':protect(key.strip().encode()).hex()}
    # Create with restrictive permissions before writing; no intermediate plaintext file.
    fd=os.open(str(CONFIG_FILE),os.O_WRONLY|os.O_CREAT|os.O_TRUNC,0o600)
    with os.fdopen(fd,'w',encoding='utf-8') as f:json.dump(data,f)
    if os.name!='nt':os.chmod(CONFIG_FILE,0o600)
