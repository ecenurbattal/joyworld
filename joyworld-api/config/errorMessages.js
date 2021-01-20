const errorMessages = {
    SERVER_ERROR: "Oops..Server error!!! Please conctact the system admin",
    NOT_FOUND: "The submitted request can not be understood",
    USER_NOT_FOUND: "The user requested not found",
    USER_INVALID_CREDENTIALS: "Wrong username or password.",
    USER_DATA_INVALID: "User data must be in json format and adhere to the spec",
    USER_DATA_USERNAME_INVALID: "username must have at least 3 characters",
    USER_DATA_PASSWORD_INVALID: "password must have at least 8 characters",
    USER_DATA_NAME_INVALID: "Name must not be empty",
    USER_DATA_EMAIL_INVALID: "Email is not valid",
    USER_USERNAME_TAKEN: "The username is taken. Please choose another.",
    USER_EMAIL_TAKEN: "The email is taken. Please choose another.",
    // POST_DATA_TITLE_INVALID: "Title must not be empty",
    // POST_DATA_CONTENT_INVALID: "Content must not be empty",
    // POST_DATA_INVALID: "Post data must be in json format and adhere to the spec",
    // POST_ID_INVALID: "Post id must be UUID v4",
    // POST_NOT_FOUND: "The post requested not found",
};
export default errorMessages;