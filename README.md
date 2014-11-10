
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

    curl -u aptirepo:secret -d message="Hello all" http://0.0.0.0:8080/rooms/ourroom@conference.demo.opinsys.net
    curl -u aptirepo:secret -H "Content-Type: application/json" -d '{ "message": "Hello json" }' http://0.0.0.0:8080/rooms/ourroom@conference.demo.opinsys.net

Also the full content of the request body is used as the message if the content
type if is `text/plain` or completely missing.

     echo "Hello again" | curl -u aptirepo:secret -H "Content-Type: text/plain" -d @- http://0.0.0.0:8080/rooms/ourroom@conference.demo.opinsys.net

This is useful with the [uri Ansible module][uri]

```yaml
- name: Log update to http2xmpp
  local_action: uri url=http://0.0.0.0:8080/rooms/ourroom@conference.demo.opinsys.net
                    method=POST user=name password=secret
                    body="Request body as a message"
```


[uri]: http://docs.ansible.com/uri_module.html

