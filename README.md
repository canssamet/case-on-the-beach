docker build -t can/performance-dash .
docker run -t -d -p 3000:3000 --name performance-dash-container  can/performance-dash
http://localhost:3000/