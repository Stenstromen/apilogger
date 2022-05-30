# APILogger

APILogger node.js project.
Log data to textfiles, from HTTP POST requests

## Docker
### Docker run persistent storage (placeholder)
```
docker run -d --rm -p 8080:8080 \
-v /path/to/dir:/usr/src/app/store/logs \
REGISTRY/APILOGGER
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