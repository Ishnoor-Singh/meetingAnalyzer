# Viber
We tell you how successful your meetings are.

## The project directory is divided into three main directory: ai, backend, and frontend

## ai
The ML pipeline is an asynchronous sensor that constantly checks on our db and, should there be unreviewed videos, it classifies them and makes sure to update their status on the dataset. 
Below are the main API methods. The following documentation was created using Sphinx. 
Sphinx is a python program to generate documentations for your classes and methods using just a few commands. 

- ```assess.py``` contains the main methods for our ml infrastructure to function
- ```example.py``` contains a brief example of how to use our API
- expression.model is the pretrained keras model we use for sentiment classification
- short.mp4 contains an example video that the example code uses to return an example classification 

## backend
The backend directory contains all of the files relating to the backend

## frontend
The frontend directory contains all of the files relating to the frontend of the project which is written in React.
The src directory contains all of the code that we wrote along with the automatically generated files by React.
##### Contained in the src directory are: index.js and the components directory
* The index.js file is the code that routes the pages of the frontend using react-router.
* The components directory contains all of the components that are displayed by index.js.
##### Contained in the components directory are: upload.jsx, dashboardAlt.jsx, engagement-line.jsx, engagement-doughnut.jsx
* The upload.jsx file contains the code for the upload page where the user can upload a recording of their meeting for analyzation.
* The dashboardAlt.jsx file contains the code for the dashboard page that displays the LineChart and DoughnutChart components.
* The engagement-line.jsx contains the code for the LineChart component that visualizes the engagement over time of meeting participants.
* The engagement-doughnut.jsx file contains the code for the DoughnutChart component that visualizes the overall engagement score.
