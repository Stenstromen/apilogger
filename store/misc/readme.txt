API Docs

Quickstart:

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
