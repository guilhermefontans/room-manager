# room-manager

This project was developed with php version 7.2, docker version 18 and docker-compose version 1.21

To install the project follow these steps: 

1 - Clone this project:
```sh
$ git clone https://github.com/guilhermefontans/room-manager.git
```
2 - Enter in the downloaded directory and run this command to download the dependencies
```sh 
$ php composer.phar install
```
3 - Copy the .env.dist file to .env to get the connection string to the database already configured to connect with the docker database.
```sh
$ cp .env.dist .env 
```
4 - Enter in the directory docker localized in the root
```sh 
$ cd docker
```
5 - Start the docker project with the command: 
```sh 
$ docker-compose up -d
```
Access your browser in the following url http://localhost 
 - username: admin
 - password: admin
