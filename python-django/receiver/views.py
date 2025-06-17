import base64
import gzip
import json

from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt

USERNAME = 'sentiance'
PASSWORD = 'securepassword'

def _basic_auth(request):
    header = request.META.get('HTTP_AUTHORIZATION')
    if not header or not header.startswith('Basic '):
        return False
    encoded = header.split(' ')[1]
    try:
        decoded = base64.b64decode(encoded).decode('utf-8')
    except Exception:
        return False
    user, pwd = decoded.split(':', 1)
    return user == USERNAME and pwd == PASSWORD

@csrf_exempt
def webhook(request, app_id=None):
    if not _basic_auth(request):
        response = HttpResponse('Unauthorized', status=401)
        response['WWW-Authenticate'] = 'Basic realm="Restricted"'
        return response

    body = request.body
    if request.META.get('HTTP_CONTENT_ENCODING') == 'gzip':
        body = gzip.decompress(body)
    data = json.loads(body)

    if app_id:
        print(f'Received webhook message from {app_id}')
        print(data)
    else:
        print('Received webhook message')
        _do_something(data)
    return HttpResponse(status=200)

def _do_something(events):
    for event in events['data']:
        meta = event['meta']
        print(f"Received event of type {meta['message_type']} at {meta['message_timestamp']}")
        print(event['data'])
