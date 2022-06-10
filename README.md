# APILogger

APILogger node.js project.
Log data to textfiles, from HTTP POST requests

## Docker

Demo available at Stenstromen/apilogger. (linux/arm64)

```
docker run -d --rm -p 80:8080 stenstromen/apilogger:latest
curl http://localhost/api/readme
```

### Persistent storage
```
mkdir logs
```
```
docker run -d --rm -p 80:8080 \
-v $PWD/logs:/usr/src/app/store/logs \
stenstromen/apilogger:latest
```
```
tail -f logs/info.log
```

### Persistent storage with provided API-key
```
mkdir -p store/logs store/misc 
```
```
echo '[{"key": "secret-key-yo"}]' > store/misc/apikey.js
```
```
docker run -d --rm -p 80:8080 \
-v $PWD/store/logs:/usr/src/app/store/logs \
-v $PWD/store/misc/apikey.js:/usr/src/app/store/misc/apikey.js \
stenstromen/apilogger:latest
```

### Roll your own

Clone 
```
git clone https://github.com/Stenstromen/apilogger.git
```

Build
```
docker build -t apilogger apilogger/.
```

Run
```
docker run -d --rm -p 80:8080 apilogger
```

Test
```
curl http://localhost/api/readme
```

### Kubernetes Deployment
```
kubectl apply -f https://raw.githubusercontent.com/Stenstromen/apilogger/main/k8s_deploy.yml
```
```
curl http://Cluster-IP:31337
```

## Quickstart
```
GET && POST requires API-Key Header (except for /api/readme):
default:
x-api-key: 7a2dc9b4-d246-4982-9d8a-486240bdaf72

GET
/api/readme             - This Readme!
/api/log/info           - Informational Log
/api/log/err            - Error Log

/api/log/info?order=asc - Informational Log in ascending order (default)
/api/log/info?order=dec - Informational Log in descending order

/api/log/err?order=asc  - Error Log in ascending order (default)
/api/log/err?order=dec  - Error Log in descending order

/api/log/info?limit=NUM - Limit Informational Log output to NUM rows (can be combined with asc/dec)
/api/log/err?limit=NUM  - Limit Error Log output to NUM rows (can be combined with asc/dec)

POST
/api/log/info           - Add Informational log message in format:\
                        {
                            "info": "Message STRING"
                        }
/api/log/err            - Add Error log message in format:\
                        {
                            "err": "Message STRING"
                        }
```

## Done
* Use node Express for API creation
* Informational logging to info.log 
* Error logging to err.log
* Write logfiles with fs.write append
* Create logfiles if not exist on startup
* Dockerfile
* Persistent storage instruction for Docker
* API GET logfile 
* Write API Readme
* API Key requirement
* API GET logfile (with limit=rows PARAM)
* Fix time logic... (Incorrect month)

## Todo
* Code Cleanup!

## Todo 2.0
* Rewrite server to follow MVC model
* Input validation with express-validator
* Add proper API key req (jwt, jsonwebtoken)
* Use SQLite for user mgmt