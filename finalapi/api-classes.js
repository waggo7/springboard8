const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";

class StoryList {
    constructor(stories) {
        this.stories = stories;
    }

    static async getStories() {
        const response = await axios.get(`${BASE_URL}/stories`);

        const stories = response.data.stories.map(story => new Story(story));
        const storyList = new StoryList(stories);
        return storyList;
    }


    async addStory(user, newStory) {
        const response = await axios({
            method: "POST",
            url: `${BASE_URL}/stories`,
            data: {
                token: user.loginToken,
                story: newStory,
            }
        });

        newStory = new Story(response.data.story);
        this.stories.unshift(newStory);
        user.ownStories.unshift(newStory);

        return newStory;
    }

    async removeStory(user, storyId) {
        await axios({
            url: `${BASE_URL}/stories/${storyId}`,
            method: "DELETE",
            data: {
                token: user.loginToken
            },
        });
        this.stories = this.stories.filter(story => story.storyId !== storyId);
        user.ownStories = user.ownStories.filter(s => s.storyId !== storyId);
    }
}
class User {
    constructor(userObj) {
        this.username = userObj.username;
        this.name = userObj.name;
        this.createdAt = userObj.createdAt;
        this.updatedAt = userObj.updatedAt;
        this.loginToken = "";
        this.favorites = [];
        this.ownStories = [];
    }

    /* Create and return a new user.
     *
     * Makes POST request to API and returns newly-created user.
     *
     * - username: a new username
     * - password: a new password
     * - name: the user's full name
     */

    static async create(username, password, name) {
        const response = await axios.post(`${BASE_URL}/signup`, {
            user: {
                username,
                password,
                name,
            }
        });

        // build a new User instance from the API response
        const newUser = new User(response.data.user);

        // attach the token to the newUser instance for convenience
        newUser.loginToken = response.data.token;

        return newUser;
    }

    /* Login in user and return user instance.

     * - username: an existing user's username
     * - password: an existing user's password
     */

    static async login(username, password) {
        const response = await axios.post(`${BASE_URL}/login`, {
            user: {
                username,
                password,
            }
        });
        const existingUser = new User(response.data.user);
        existingUser.favorites = response.data.user.favorites.map(s => new Story(s));
        existingUser.ownStories = response.data.user.stories.map(s => new Story(s));
        existingUser.loginToken = response.data.token;
        return existingUser;
    }


    static async getLoggedInUser(token, username) {
        // if we don't have user info, return null
        if (!token || !username) return null;

        // call the API
        const response = await axios.get(`${BASE_URL}/users/${username}`, {
            params: { token }
        });

        // instantiate the user from the API information
        const existingUser = new User(response.data.user);

        // attach the token to the newUser instance for convenience
        existingUser.loginToken = token;

        // instantiate Story instances for the user's favorites and ownStories
        existingUser.favorites = response.data.user.favorites.map(s => new Story(s));
        existingUser.ownStories = response.data.user.stories.map(s => new Story(s));

        return existingUser;
    }

    async retrieveDetails() {
        const response = await axios.get(`${BASE_URL}/users/${this.username}`, {
            params: {
                token: this.loginToken
            }
        });

        this.name = response.data.user.name;
        this.createdAt = response.data.user.createdAt;
        this.updatedAt = response.data.user.updatedAt;


        this.favorites = response.data.user.favorites.map(s => new Story(s));
        this.ownStories = response.data.user.stories.map(s => new Story(s));

        return this;
    }



    addFavorite(storyId) {
        return this._toggleFavorite(storyId, "POST");
    }

    removeFavorite(storyId) {
        return this._toggleFavorite(storyId, "DELETE");
    }
    async _toggleFavorite(storyId, httpVerb) {
        await axios({
            url: `${BASE_URL}/users/${this.username}/favorites/${storyId}`,
            method: httpVerb,
            data: {
                token: this.loginToken
            }
        });

        await this.retrieveDetails();
        return this;
    }

    async update(userData) {
        const response = await axios({
            url: `${BASE_URL}/users/${this.username}`,
            method: "PATCH",
            data: {
                user: userData,
                token: this.loginToken
            }
        });

        // "name" is really the only property you can update
        this.name = response.data.user.name;

        return this;
    }


    async remove() {
        await axios({
            url: `${BASE_URL}/users/${this.username}`,
            method: "DELETE",
            data: {
                token: this.loginToken
            }
        });
    }
}

/**
 * Class to represent a single story.
 */

class Story {

    /**
     * The constructor is designed to take an object for better readability / flexibility
     * - storyObj: an object that has story properties in it
     */

    constructor(storyObj) {
        this.author = storyObj.author;
        this.title = storyObj.title;
        this.url = storyObj.url;
        this.username = storyObj.username;
        this.storyId = storyObj.storyId;
        this.createdAt = storyObj.createdAt;
        this.updatedAt = storyObj.updatedAt;
    }

    /**
     * Make a PATCH request against /stories/{storyID} to update a single story
     * - user: an instance of User
     * - storyData: an object containing the properties you want to update
     */

    async update(user, storyData) {
        const response = await axios({
            url: `${BASE_URL}/stories/${this.storyId}`,
            method: "PATCH",
            data: {
                token: user.loginToken,
                story: storyData
            }
        });

        const { author, title, url, updatedAt } = response.data.story;

        // these are the only fields that you can change with a PATCH update
        //  so we don't need to worry about updating the others
        this.author = author;
        this.title = title;
        this.url = url;
        this.updatedAt = updatedAt;

        return this;
    }
}