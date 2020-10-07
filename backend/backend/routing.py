from channels.routing import ProtocolTypeRouter, URLRouter
import message.routing

application = ProtocolTypeRouter({
    'http': URLRouter(message.routing.urlpatterns),
})
