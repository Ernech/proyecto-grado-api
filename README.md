<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Proyecto de grado - 2023
1. Copy the ```.env.example``` and rename it to ```.env```
2. Set your enviroment variables in the ```.env``` file.
3. Execute 
```
npm install 
```
4. Run docker images (docker desktop needed)
```
docker-compose up -d
```
5. Execute project.
```
npm run start:dev
```
6. To access to pgadmin go to:
```
localhost:5433
```
7. Create a new user admin sond a POST request to
```
http://localhost:3000/user
```
With the following JSON structure
```
{
    "name":"",
    "lastName":"",
    "position":"",
    "email":"",
    "password":""
}
```

[Vue Js App (Recruiter - Admin)](https://github.com/Ernech/proyecto-grado-web)

[Vue Js App (Candidate)](https://github.com/Ernech/proyecto-grado-web-candidate)
