dev: 
	sudo docker-compose  -f ./docker-compose.dev.yml up --build

prod: 
	sudo docker-compose  -f ./docker-compose.yml up --build

down:
	sudo docker-compose down
