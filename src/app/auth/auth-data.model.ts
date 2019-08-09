export interface AuthData{
    email: string;
    password: string;
    // we will use AuthData for submitting the data at backend
   //Now we could also create a user model here but a user actually should not all the time have the password
//attached to it on the front-end,
//I don't want to store the password on the front-end anywhere for too long,therefore I will use that AuthData for submitting the data to the back-end
}
