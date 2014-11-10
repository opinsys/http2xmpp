
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

The `message` field of `x-www-form-urlencoded` or `json` POST requests will be used as the message

    curl -d message="Hello all" -u aptirepo:secret http://0.0.0.0:8080/rooms/ourroom@conference.demo.opinsys.net
    curl -d '{ "message": "Hello json" }' -u aptirepo:secret -H "Content-Type:application/json" http://0.0.0.0:8080/rooms/ourroom@conference.demo.opinsys.net

The full content of the request body is used as the message if the content type
if is `text/plain` or completely missing.

HTTP POST

     curl -d "Hello from POST" -u aptirepo:secret -H "Content-Type: text/plain" http://0.0.0.0:8080/rooms/ourroom@conference.demo.opinsys.net

HTTP PUT

     echo "Hello from PUT" | curl -u aptirepo:secret -T - http://0.0.0.0:8080/rooms/ourroom@conference.demo.opinsys.net

Usage from the [Ansible uri module][uri]

```yaml
- name: Log update to http2xmpp
  local_action: uri url=http://0.0.0.0:8080/rooms/ourroom@conference.demo.opinsys.net
                    method=POST user=name password=secret
                    body="Request body as a message"
```


[uri]: http://docs.ansible.com/uri_module.html

