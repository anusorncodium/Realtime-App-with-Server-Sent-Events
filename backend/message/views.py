# -*- coding: utf-8 -*-
from __future__ import unicode_literals

import json
from django.http import HttpResponse, HttpResponseNotAllowed
from django.core.serializers.json import DjangoJSONEncoder
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from django_eventstream import send_event, get_current_event_id


@api_view(['GET', 'POST'])
@permission_classes([AllowAny])
def messages(request):
    if request.method == 'GET':

        body = json.dumps(
            {
                'message': 'Why do you read this?'
            },
            cls=DjangoJSONEncoder) + '\n'

        return HttpResponse(body, content_type='application/json')

    elif request.method == 'POST':

        body = json.dumps(
            {
                'message': 'Your message has been sent.'
            },
            cls=DjangoJSONEncoder) + '\n'

        send_event('test-message', 'message', request.data['message'])

        return HttpResponse(body, content_type='application/json')

    else:
        return HttpResponseNotAllowed(request.method)
