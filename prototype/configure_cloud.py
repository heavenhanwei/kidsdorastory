"""Run locally in your own terminal; the API key input is hidden."""
import getpass
from cloud_config import save_config, CONFIG_FILE, DEFAULT_BASE, DEFAULT_MODEL

def main():
    print('Duola cloud setup. Settings are stored outside this project.')
    base=input('API base URL [Beijing DashScope; Enter to use default]: ').strip() or DEFAULT_BASE
    model=input('Model name [qwen3.8-flash]: ').strip() or DEFAULT_MODEL
    key=getpass.getpass('API key (hidden): ').strip()
    try:save_config(base,model,key)
    except (ValueError,OSError):
        print('Settings were not saved. Check the HTTPS URL, model name and key.');return 1
    finally:key=''
    print('Saved outside project: '+str(CONFIG_FILE))
    print('Refresh the prototype. The server reads settings for each request.')
    return 0

if __name__=='__main__':raise SystemExit(main())
