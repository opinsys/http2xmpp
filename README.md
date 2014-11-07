
# http2xmpp

Super simple http to xmpp gateway

Create following `config.json` file

```json
{
    "jid": "http2xmpp@demo.opinsys.net",
    "password": "xmppsecret",
    "credentials": {
        "aptirepo": "secret",
        "puavo-ticket": "secret"
    }
}
```

where `jid` and `password` are jabber credentials and `credentials` is local
credentials


## Usage

    curl -u aptirepo:secret -d message="Hello all" http://0.0.0.0:8080/rooms/ourroom@conference.demo.opinsys.net
