from .atri import Atri
from fastapi import Request, Response
from atri_utils import *
import requests
import io
import base64


def get_snippet(at: Atri, code: str, theme: str, lang: str):
    print(theme, lang)
    json_data = {
        'code': code,
        'language': '-'.join(lang.strip().lower().split()),
        'theme': '-'.join(theme.strip().lower().split()),
        "paddingVertical": "4px",
        "paddingHorizontal": "4px",
    }
    response = requests.post('https://carbonara-42.herokuapp.com/api/cook', json=json_data)
    at.Image1.custom.src = create_media_response(response.content, mime_type='images/png')

def init_state(at: Atri):
    """
    This function is called everytime "Publish" button is hit in the editor.
    The argument "at" is a dictionary that has initial values set from visual editor.
    Changing values in this dictionary will modify the intial state of the app.
    """

    pass

def handle_page_request(at: Atri, req: Request, res: Response, query: str):
    """
    This function is called whenever a user loads this route in the browser.
    """
    with open('languages.txt', 'r') as f:
        arr = [i.strip('\n') for i in f.readlines()]
    at.Dropdown1.custom.values = arr
    at.Dropdown1.custom.displayedValues = [arr[0]]

    with open('themes.txt', 'r') as f:
        arr = [i.strip('\n') for i in f.readlines()]
    at.Dropdown2.custom.values = arr
    at.Dropdown2.custom.displayedValues = [arr[0]]
    pass

def handle_event(at: Atri, req: Request, res: Response):
    """
    This function is called whenever an event is received. An event occurs when user
    performs some action such as click button.
    """
    if at.Button1.onClick:
        get_snippet(at, at.Input1.custom.value, at.Dropdown2.custom.selectedValue, at.Dropdown1.custom.selectedValue)

    if at.Button2.onClick:
        byte = base64.b64decode(at.Image1.custom.src.split(',')[1])
        image = Image.open(io.BytesIO(byte)).convert('RGB')
        image.save('code.jpeg')
    if at.Button3.onClick:
        byte = base64.b64decode(at.Image1.custom.src.split(',')[1])
        image = Image.open(io.BytesIO(byte))
        image.save('code.png')

