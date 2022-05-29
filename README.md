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

## Todo
* Code Cleanup!
* API GET logfile (with limit=rows PARAM)