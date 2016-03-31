set DBNAME=ak
set PORT=3000
start /b npm start > service1.log 2>&1
set DBNAME=lq
set PORT=3001
start /b npm start > service2.log 2>&1
set DBNAME=rz
set PORT=3002
start /b npm start > service3.log 2>&1