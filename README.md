# RevOverflow

RevOverflow is a site dedicated to providing support to technical problems encountered by the Revature community during training and project work. This platform is intended to provide a positive, constructive location to seek help from the Revature community regarding challenges that developers frequently face. It also helps facilitate transfer of knowledge between associates and batches, helps document and solve common problems, and provides a mechanism for associates to gain knowledge by helping one another. RevOverflow integrates with the Revature Swag Shop to provide the opportunity for participants to earn rewards.

## Technologies Used

### Front End
- React JS: version ^16.13.1
- Redux: version ^4.0.5
- Material UI: version ^4.11.0
- TypeScript: version ^3.7.2
- AJAX - axios: version ^0.21.1
- Git
- Visual Studio Code

### Back End
- Java: version 1.8
- Spring Boot: version ^2.2.1
- Hibernate: version 5.1.3.Final
- Swagger: version ^2.9.2
- H2 Database
- Log4J: version ^1.2.17
- Maven: version 1.8
- Tomcat: version 9.0
- Mockito
- Eclipse: Spring Tool Suit 4

### Deployment
- AWS EC2
- AWS RDS
- Docker
- Jenkin (Continous Deployment Server on EC2)

## Feature

- Email Login as User or Admin.
- Users can post questions explaining their technical problem.
- Users can provide solutions to technical problems encountered by others.
- User can post and view questions and answers in a section dedicated to location specific questions or Revature specific questions.
- Filter the location based questions by the location.
- Admin can add questions and corresponding answers to the 'Frequently Asked Questions' sections.
- Users can view a 'Frequently Asked Questions' section for both locations and Revature.

### Todo (stretch goal)
- User, I should be able to view another users profile where I can see the questions and answers submitted by the other user.
- Horizontal Scalability

## Usage
Our application utilizes a storefront API which communicates using RESTful conventions with our backend, which is hosted on AWS's (Amazon Web Services) EC2 servers. In turn - our backend utilizes Hibernate and STS (Spring Tool Suite) to communicate with a PostgreSQL RDS we also host on AWS.
All this comes together in our frontend which is built using React. Our two distinct API's meet here and communicate through standard HTTP protocols. We encrypt all our users logins as well as ensure all endpoints are distinct and cannot be compromised.

## Contributers
- Aleksandar Nikolic
- Andy Jian
- Antardeep Kaur
- Arjun Patel
- Colin Shaw
- Domanic Yalda
- Haocheng Xu
- Hassen Rammal
- Heng Wang
- Henry Hsieh
- Jinyeong Kim
- Kelvin Trinh
- Krystyna lopez
- Mahesh Kalle
- Manik Bhushan
- Matthew Northmore
- Mohammad Hamza
- Mohammed Hammad
- Muhtasim Chowdhury
- Ramninder Saini
- Ravirajsinh dodiya
- Rous Epistola
- Samin Islam
- Sayeepan Selvagunarajah
- Stephen Razis
- Stephen Wong
- Syed Mohammad Azib
- Tristan Brennan


## License

The project is under the GNU [General Public License](https://github.com/917-Alec-Batson/revoverflow-frontend/blob/master/LICENSE)
