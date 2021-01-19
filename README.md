## Inspiration

During these unprecedented times in the middle of a global pandemic, hospitals and clinics are reaching full capacity with an overflow of patients. Health care practitioners are forced to prioritize patients due to ICU limitations. In addition, it is inspired by our past experiences of visiting doctors. Often, we would meet/call the nurse to explain our symptoms before getting referred to a physician. If the nurse determines your symptoms to be severe enough, you get an appointment with a doctor. However, wait times can become tedious before your appointment. Therefore, we decided to develop an app that will streamline communication between patients and medical practitioners. This can assist in cutting down wait times, prioritizing patients with more severe symptoms, as well as giving users an easy way to track their symptoms.


## What it does

A health app that allows users that are feeling sick to record and track symptoms along with general sentiment for the day. The recordings will be done via voice, and then converted to text automatically. Users are able to see/hear past recordings along with the text and will be able to fill out quick forms after each recording so the system can get a better idea of how they are feeling. Additionally, the app will run analysis algorithms on the user's data to determine the severity of this condition. This analysis can be will be used in two main ways:
To create a prioritization algorithm that will rank the users on the system based on the severity of the condition. The reasoning for this is that a spike in COVID-19 has made medical attention much sparser and harder for most to get. Ranking the users would allow doctors/medical centers to better determine who needs care. Not only would they be able to see the rankings, but the analysis summary for each user would allow them to quickly determine who needs care.
If the patient's condition is increasing in severity then we can connect them with a doctor to monitor their status because COVID-19 has made it much riskier for patients to go to the hospital. Converting the speak to text, and providing an updating summary on how the user is doing would make it faster for the doctor to review how they are doing and prescribe them appropriately.


##About The Team

Our team is a group of computer programmers at various institutions of higher learning. We are made up of one sophomore, two juniors, and a senior. Our main goal for this project is to develop a working mobile app that addresses all the sectors of our idea and gives users a clean and efficient way to handle their medical needs. We are passionate about tech for social good and healthcare, and therefore we are eager to put our skills to use in these areas!


## How we built it

First, we built the client side of our application using React Native to ensure that it has cross platform support. To address the backend and database needs, we used Google Firebase for User Authentication, Storage Space (for audio recordings and user profile pictures), and Cloud Firestore (scalable NoSQL database). Then we wrote and deployed a Google Cloud function to call the Google Cloud Voice to Text API to convert the users recording to text and display it to them in near real-time. Once we had this functionality working, we designed and implemented our custom text parsing algorithm to parse the user’s recording text for key symptoms. Then in the backend, we set up functionality to call the Symptom Checker API to fetch disease predictions based on the parsed symptoms, and store the symptoms and disease predictions in our database. For the functionality to send your symptoms to a doctor, we set up and deployed a cloud function to trigger the Twilio API to send a message to the specified number with the user information. 


## Challenges we ran into
There isn't much documentation on Twilio SMS for React Native Expo. Hence, there were many failed attempts before we succeeded. We also spent a long time finding an API or pre-trained ML model we could use to predict possible diseases from symptoms. It took us a while to figure out how to trigger the API calls. Initially, we had planned to use Tensorflow.js but none of their pre-trained models fit our use case.
In addition, we spent a long time getting Google's voice to text function properly integrated with our application with the use of cloud functions.

## Accomplishments that we're proud of
We are proud to have made a fully functioning mobile application with all the core features of our idea! Our application features accurate and instant Voice-to-Text, a custom text parsing model for symptom extraction, ability to store and track all previous recordings, easily set up a communication pipeline with your doctors, as well a profile screen to show a summary and disease predictions for all the user’s recordings.


## What's next for HealthFirst AI
Improving the ML model for better predictions of diseases. Increasing our database of symptoms. Expanding the functionality of core features. Providing an AI chatbot and smoother communication pipeline with hospitals.


**Core Features**
- [x] Make recording of our symptoms/well being
- [x] Convert recordings to text
- [x] Parse text for symptoms
- [x] Make predictions of possible diseases based on symptoms
- [x] Summarise health data in the form of list views and graphs
- [x] Send health summary to medical practitioners and/or family members

## About The Team
Our team is a group of computer programmers at various institutions of higher learning. We developed this project for HackDavis 2021. Our main goal for this project is to develop a working MVP of our idea. We are passionate about tech for social good, and therefore we are eager to put our skills to use in these areas! 

Contributors | Email
------------ | -------------
Sivam Argawalla | sivam.argawalla@gmail.com
Cagan Sevencan | cagan.sevencan@sjsu.edu
Swati Chayapathi | swathi.chayapathi@sjsu.edu
Jolie Ip | ipjolie1507@gmail.com

## Built With

* React Native
* Twilio
* Google Cloud Speech-to-text API
* Firebase
* ApiMedic Symptom Checker API

## Prototype
![HealthFirst gif demo](./GIF/HealthFirst.gif)

<img src="https://user-images.githubusercontent.com/61493372/104864981-819e5f00-58ef-11eb-8c0d-8a16208d86d6.jpg" width="300" height="600"> | <img src="https://user-images.githubusercontent.com/61493372/104864985-8400b900-58ef-11eb-95ef-fed3b4829a04.jpg" width="300" height="600"> | <img src="https://user-images.githubusercontent.com/61493372/104866248-eb6c3800-58f2-11eb-935e-891725742f98.jpg" width="300" height="600"> | <img src="https://user-images.githubusercontent.com/61493372/104864986-84994f80-58ef-11eb-872f-346f0f8828e4.jpg" width="300" height="600"> | <img src="https://user-images.githubusercontent.com/61493372/104866239-e8714780-58f2-11eb-8263-60895174700e.jpg" width="300" height="600"> |



