$(async function() {
    // cache some selectors we'll be using quite a bit
    const $body = $("body");
    const $allStoriesList = $("#all-articles-list");
    const $submitForm = $("#submit-form");
    const $favoritedStories = $("#favorited-articles");
    const $filteredArticles = $("#filtered-articles");
    const $loginForm = $("#login-form");
    const $createAccountForm = $("#create-account-form");
    const $ownStories = $("#my-articles");
    const $navLogin = $("#nav-login");
    const $navWelcome = $("#nav-welcome");
    const $navUserProfile = $("#nav-user-profile");
    const $navLogOut = $("#nav-logout");
    const $navSubmit = $("#nav-submit");
    const $userProfile = $("#user-profile");

    // global storyList variable
    let storyList = null;

    // global user variable
    let currentUser = null;

    await checkIfLoggedIn();

    $loginForm.on("submit", async function(evt) {
        evt.preventDefault(); // no page-refresh on submit

        // grab the username and password
        const username = $("#login-username").val();
        const password = $("#login-password").val();

        // call the login static method to build a user instance
        const userInstance = await User.login(username, password);

        // set the global user to the user instance
        currentUser = userInstance;
        syncCurrentUserToLocalStorage();
        loginAndSubmitForm();
    });

    /**
     * Event listener for signing up.
     *  If successful, will setup a new user instance
     */

    $createAccountForm.on("submit", async function(evt) {
        evt.preventDefault(); // no page refresh

        // grab the required fields
        const name = $("#create-account-name").val();
        const username = $("#create-account-username").val();
        const password = $("#create-account-password").val();

        // call create method, which calls  API and then builds a new user instance
        const newUser = await User.create(username, password, name);

        currentUser = newUser;
        syncCurrentUserToLocalStorage();
        loginAndSubmitForm();
    });

    /**
     * Log Out Functionality
     */

    $navLogOut.on("click", function() {
        // empty out local storage
        localStorage.clear();
        // refresh the page, clearing memory
        location.reload();
    });

    /**
     * Submit article event handler.
     *
     * */

    $submitForm.on("submit", async function(evt) {
        evt.preventDefault();
        const title = $("#title").val();
        const url = $("#url").val();
        const hostName = getHostName(url);
        const author = $("#author").val();
        const username = currentUser.username

        const storyObject = await storyList.addStory(currentUser, {
            title,
            author,
            url,
            username
        });

        const $li = $(`
      <li id="${storyObject.storyId}" class="id-${storyObject.storyId}">
        <span class="star">
          <i class="far fa-star"></i>
        </span>
        <a class="article-link" href="${url}" target="a_blank">
          <strong>${title}</strong>
        </a>
        <small class="article-hostname ${hostName}">(${hostName})</small>
        <small class="article-author">by ${author}</small>
        <small class="article-username">posted by ${username}</small>
      </li>
    `);
        $allStoriesList.prepend($li);

        $submitForm.slideUp("slow");
        $submitForm.trigger("reset");
    });
    $(".articles-container").on("click", ".star", async function(evt) {
        if (currentUser) {
            const $tgt = $(evt.target);
            const $closestLi = $tgt.closest("li");
            const storyId = $closestLi.attr("id");

            // if the item is already favorited
            if ($tgt.hasClass("fas")) {
                // remove the favorite from the user's list
                await currentUser.removeFavorite(storyId);
                // then change the class to be an empty star
                $tgt.closest("i").toggleClass("fas far");
            } else {
                // the item is un-favorited
                await currentUser.addFavorite(storyId);
                $tgt.closest("i").toggleClass("fas far");
            }
        }
    });

    $navLogin.on("click", function() {
        // Show the Login and Create Account Forms
        $loginForm.slideToggle();
        $createAccountForm.slideToggle();
        $allStoriesList.toggle();
    });


    $navUserProfile.on("click", function() {
        // hide everything
        hideElements();
        // except the user profile
        $userProfile.show();
    });

    $navSubmit.on("click", function() {
        if (currentUser) {
            hideElements();
            $allStoriesList.show();
            $submitForm.slideToggle();
        }
    });


    $body.on("click", "#nav-favorites", function() {
        hideElements();
        if (currentUser) {
            generateFaves();
            $favoritedStories.show();
        }
    });

    $body.on("click", "#nav-all", async function() {
        hideElements();
        await generateStories();
        $allStoriesList.show();
    });


    $body.on("click", "#nav-my-stories", function() {
        hideElements();
        if (currentUser) {
            $userProfile.hide();
            generateMyStories();
            $ownStories.show();
        }
    });

    /**
     * Event Handler for Deleting a Single Story
     */

    $ownStories.on("click", ".trash-can", async function(evt) {
        // get the Story's ID
        const $closestLi = $(evt.target).closest("li");
        const storyId = $closestLi.attr("id");

        // remove the story from the API
        await storyList.removeStory(currentUser, storyId);

        // re-generate the story list
        await generateStories();

        // hide everyhing
        hideElements();

        // ...except the story list
        $allStoriesList.show();
    });

    async function checkIfLoggedIn() {

        const token = localStorage.getItem("token");
        const username = localStorage.getItem("username");

        currentUser = await User.getLoggedInUser(token, username);
        await generateStories();

        if (currentUser) {
            generateProfile();
            showNavForLoggedInUser();
        }
    }


    function loginAndSubmitForm() {
        $loginForm.hide();
        $createAccountForm.hide();

        $loginForm.trigger("reset");
        $createAccountForm.trigger("reset");

        $allStoriesList.show();

        showNavForLoggedInUser();

        generateProfile();
    }

    function generateProfile() {
        // show your name
        $("#profile-name").text(`Name: ${currentUser.name}`);
        // show your username
        $("#profile-username").text(`Username: ${currentUser.username}`);
        // format and display the account creation date
        $("#profile-account-date").text(
            `Account Created: ${currentUser.createdAt.slice(0, 10)}`
        );
        // set the navigation to list the username
        $navUserProfile.text(`${currentUser.username}`);
    }



    async function generateStories() {
        // get an instance of StoryList
        const storyListInstance = await StoryList.getStories();
        // update our global variable
        storyList = storyListInstance;
        // empty out that part of the page
        $allStoriesList.empty();

        // loop through all of our stories and generate HTML for them
        for (let story of storyList.stories) {
            const result = generateStoryHTML(story);
            $allStoriesList.append(result);
        }
    }


    function generateStoryHTML(story, isOwnStory) {
        let hostName = getHostName(story.url);
        let starType = isFavorite(story) ? "fas" : "far";

        // render a trash can for deleting your own story
        const trashCanIcon = isOwnStory ?
            `<span class="trash-can">
          <i class="fas fa-trash-alt"></i>
        </span>` :
            "";

        const storyMarkup = $(`
      <li id="${story.storyId}">
        ${trashCanIcon}
        <span class="star">
          <i class="${starType} fa-star"></i>
        </span>
        <a class="article-link" href="${story.url}" target="a_blank">
          <strong>${story.title}</strong>
          </a>
        <small class="article-author">by ${story.author}</small>
        <small class="article-hostname ${hostName}">(${hostName})</small>
        <small class="article-username">posted by ${story.username}</small>
      </li>
    `);

        return storyMarkup;
    }

    function generateFaves() {
        // empty out the list by default
        $favoritedStories.empty();

        // if the user has no favorites
        if (currentUser.favorites.length === 0) {
            $favoritedStories.append("<h5>No favorites added!</h5>");
        } else {
            // for all of the user's favorites
            for (let story of currentUser.favorites) {
                // render each story in the list
                let favoriteHTML = generateStoryHTML(story, false, true);
                $favoritedStories.append(favoriteHTML);
            }
        }
    }

    function generateMyStories() {
        $ownStories.empty();

        if (currentUser.ownStories.length === 0) {
            $ownStories.append("<h5>No stories added by user yet!</h5>");
        } else {
            // for all of the user's posted stories
            for (let story of currentUser.ownStories) {
                // render each story in the list
                let ownStoryHTML = generateStoryHTML(story, true);
                $ownStories.append(ownStoryHTML);
            }
        }

        $ownStories.show();
    }


    function hideElements() {
        const elementsArr = [
            $submitForm,
            $allStoriesList,
            $filteredArticles,
            $ownStories,
            $userProfile,
            $favoritedStories,
            $loginForm,
            $createAccountForm,
            $userProfile
        ];
        elementsArr.forEach($elem => $elem.hide());
    }

    function showNavForLoggedInUser() {
        $navLogin.hide();
        $userProfile.hide();
        $(".main-nav-links, #user-profile").toggleClass("hidden");
        $navWelcome.show();
        $navLogOut.show();
    }

    function isFavorite(story) {
        let favStoryIds = new Set();
        if (currentUser) {
            favStoryIds = new Set(currentUser.favorites.map(obj => obj.storyId));
        }
        return favStoryIds.has(story.storyId);
    }

    function getHostName(url) {
        let hostName;
        if (url.indexOf("://") > -1) {
            hostName = url.split("/")[2];
        } else {
            hostName = url.split("/")[0];
        }
        if (hostName.slice(0, 4) === "www.") {
            hostName = hostName.slice(4);
        }
        return hostName;
    }


    function syncCurrentUserToLocalStorage() {
        if (currentUser) {
            localStorage.setItem("token", currentUser.loginToken);
            localStorage.setItem("username", currentUser.username);
        }
    }
});