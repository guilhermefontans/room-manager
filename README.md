# room-manager

This project require php version 7.2 or greater 

To install the project follow these steps: 

- Clone this project:
```sh
$ git clone https://github.com/guilhermefontans/room-manager.git
```
- Enter in the downloaded directory and run this command to download the dependencies
```sh 
$ php composer.phar install
```
- Copy the .env.dist file to .env and set the connection string to the database located inside the file
- Import the script located in the dump/init.sql folder with the command:
```sh
$ mysql -u user -p password -f < dump/init.sql 
```
- Start the php server with the command: 
```sh 
$ php -S 127.0.0.1:8000 -t public
```

- Access your browser in the following url 127.0.0.1:8000 
 username: admin
 password: admin
