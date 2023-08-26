# Career Developer Learning Management System

## Table of Contents
1. Introduction
2. System Requirements
3. Features
4. Installation
5. Project Documentation
6. Project Screenshots
7. Contributing
## Introduction
Career Developer Learning Management System (LMS) is a comprehensive web-based platform designed to enhance the educational experience for both students and instructors. This README provides an overview of the project, system requirements, installation instructions, and usage guidelines.

### Project Team
+ Vishal Yadav (201B355)
- Samyak kr Sharma (201B356)
* Shivam Tharvani (201B381)
### Project Advisor
+ Dr. Ravindra Kumar Singh, Assistant Professor, Department of Computer Science and Engineering, Jaypee University of Engineering and Technology.
### Abstract
The Career Developer LMS addresses the challenges faced by traditional educational systems by offering a centralized platform for managing and delivering educational resources. Key features include content management, assessment tools, personalization, and integration with existing systems.

### System Requirements
Before installing and using the Career Developer LMS, ensure that your system meets the following requirements:

#### Hardware Requirements
1. Web Server:
Multi-core processor
Minimum 8 GB RAM (16 GB or higher recommended)
Solid State Drive (SSD) with sufficient storage
Fast and reliable internet connection
2. Database Server:
Multi-core processor
Minimum 8 GB RAM (higher recommended)
SSD storage
Fast network connection
Load Balancer (if needed for scalability)
Backup and Redundancy measures
3. Security Measures: SSL certificate, Firewall, Intrusion Detection System (IDS)
#### Software Requirements:
ReactJS
JavaScript
HTML
CSS
Bootstrap
Node.js
Django
MySQL
Database Management System (DBMS)
REST API
Visual Studio Code (or any code editor of your choice)
### Features
The Career Developer LMS offers the following features:

1. _User-Friendly Interface:_
An intuitive interface for easy navigation.
2. _Course Management:_
Instructors can efficiently create and manage courses.
3. _Content Creation and Delivery:_
Tools for creating and delivering multimedia content.
4. _Personalized Learning Paths_
Support for personalized learning experiences.
5. _Assessment and Feedback:_
Flexible assessment options with automated grading.
6. _Integration and Scalability:_
Integration with existing systems and scalability for growth.
7. _Security and Privacy:_
Robust security measures and data protection
## Installation
To install and run the Career Developer LMS on your system, follow these steps:
1. Clone the repository:
     + ##### git clone https://github.com/your-username/career-developer-lms.git
2. Navigate to the project directory:
     + ##### cd Career-Developer-LMS
3. Install the required dependencies for both the frontend (ReactJS) and backend (Django):
   > Navigate to the frontend directory
     + ##### cd career_builder_frontend
     + ##### npm install

   > Navigate to the backend directory
     + ##### cd ../lms_api
     + ##### pip install -r requirements.txt
4. Set up the database:
   + ##### Create a MySQL database and configure the database settings in the Django project's settings file (lms_api/settings.py).
5. Run the migrations to create the necessary database tables:
     + ##### python manage.py makemigrations
     + ##### python manage.py migrate
6. Start the development server:
   > Inside the lms_api directory
     + ##### python manage.py runserver
7. Start the frontend development server:
   > Inside the career_builder_frontend directory
     + ##### npm start
8. Access the Career Developer LMS in your web browser:
     + ##### http://localhost:3000/
## Project Documentation
### Project Structure 
Depicted below is the architecture diagram of the Learning Management System.
![ProjectStructure](https://github.com/Vishal355Yadav/Career-Developer-LMS/assets/91442834/1dae9ac6-4c68-4ed8-8efd-1fd7d849b708)
<br>
### Use Case Diagram
Depicted below is the use case diagram of the Learning Management System. User and Teacher is representing the actor of the use case diagram.
![Use Case Diagram](https://github.com/Vishal355Yadav/Career-Developer-LMS/assets/91442834/dd3191cf-5d30-427f-bd70-cb6ab9258709)
<br>
### ER Diagram
Depicted below is the Entity-Relationship Diagram of the Learning Management System. 
![ER Diagram](https://github.com/Vishal355Yadav/Career-Developer-LMS/assets/91442834/3a7cc139-6507-43d7-9a66-825e31eb03ee)
<br>
### Data Flow Diagram
Depicted below is the Data Flow Diagram of the Learning Management System.
> Level 0
![DFD L0](https://github.com/Vishal355Yadav/Career-Developer-LMS/assets/91442834/3db6439f-92b6-4c1f-a5d0-7e70946d6412)
> Level 1
![DFD L1](https://github.com/Vishal355Yadav/Career-Developer-LMS/assets/91442834/56e9b2ff-c66c-4eef-a475-f4c9b786e12b)
### Sequence Diagram 
Depicted below is the Sequence Diagram of the Learning Management System.

![Sequence Diagram](https://github.com/Vishal355Yadav/Career-Developer-LMS/assets/91442834/25bfce49-d6f3-4289-89fa-e63c7fff3374)
## Project Screenshots
> #### LMS Home Page
![LMS Home](https://github.com/Vishal355Yadav/Career-Developer-LMS/assets/91442834/571a66d3-902d-4d64-9476-c2c5e9941464)
<br>
> #### Teacher Login Page
![Teacher Login](https://github.com/Vishal355Yadav/Career-Developer-LMS/assets/91442834/2e76bfa7-e889-4b05-b9f9-bb2f7cbaa50e)
<br>
> #### Teacher Dashboard 
![Teacher DashBoard](https://github.com/Vishal355Yadav/Career-Developer-LMS/assets/91442834/9f30dbd0-4087-49b6-9cb3-1827044d0347)
<br>
> #### Student Dashboard 
![Student Dashboard](https://github.com/Vishal355Yadav/Career-Developer-LMS/assets/91442834/d8e97191-fc04-4930-90d9-12cf15ca565c)
<br>
> #### Courses of the Particular Teacher
![Teacher Courses](https://github.com/Vishal355Yadav/Career-Developer-LMS/assets/91442834/c609b991-f2e3-4790-aa23-9c15fdfde709)
<br>

> #### Assigned Quiz to the student 
![Quiz](https://github.com/Vishal355Yadav/Career-Developer-LMS/assets/91442834/8fd98fbe-1ac1-4b52-8dbe-f1399200b2f2)

## Contributing
We welcome contributions from the open-source community. To contribute to the Career Developer LMS project, please follow these steps:
1. Fork the repository on GitHub.
2. Clone your forked repository to your local machine.
3. Create a new branch for your feature or bug fix.
4. Make your changes and test them thoroughly.
5. Commit your changes with clear and concise commit messages.
6. Push your changes to your forked repository.
7. Create a pull request to the main project repository.
8. Our team will review your pull request, provide feedback, and merge it if it meets our guidelines.

> For any questions or inquiries, please contact the project team or the project advisor. Thank you for your interest in the Career Developer Learning Management System!
