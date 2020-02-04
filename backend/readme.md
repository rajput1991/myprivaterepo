--------------------------------------------------
Running Express Backend server in docker container
--------------------------------------------------
- docker build -t krahulrajput/backend .
- docker run -p 8888:3000 krahulrajput/backend

- Access App over localhost:8888/{serviceEndPoints}

To start a shell in container:
- docker run -it krahulrajput/backend sh
