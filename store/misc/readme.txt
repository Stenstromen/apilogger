API Docs

Quickstart:

GET
/api/readme     - This Readme!
/api/log/info   - Informational Log
/api/log/err    - Error Log

POST
/api/log/info   - Add Informational log message in format:\
                {
                    "info": "Message STRING"
                }
/api/log/err    - Add Error log message in format:\
                {
                    "err": "Message STRING"
                }
