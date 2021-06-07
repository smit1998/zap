

#### 2.1.1. Login Screen
 * **UI ADDITION**: Invalid Input checking - Also have options to access register page (accessibility)

#### 2.1.2. Register Screen
 * **UI ADDITION**:  Also options to navigate back to the login page

#### 2.1.3. Logout Button
 * **BUG** Have to refresh to actually log out - See what you can do.


#### 2.2.1. Dashboard
 * A dashboard of all games is displayed, where each game shows the title, number of questions, a thumbnail, and a total time to complete (sum of all individual question times)
 * **BUG** Add number of questions
 * **BUG** Disable the play button if it has no questions
 * **BUG** If we don't end up finihing results, delete the view results option.

#### 2.2.2. Edit BigBrain Game
 * Edit done, no extra ui - Icons??

#### 2.2.3. Edit BigBrain Game Question
   * The ability to optionally attach a URL to a youtube video, or upload a photo, to enhance the question being asked).
   * **TO CHECK** If disallows deleting when the game has 2 answers && disallows addin when game alread has 2 answers
   * **TO CHECK** If the game type is single, don't allow more than one answer
   * **TO Check** if the game type is multiple, allow more than one answer
   * **TO CHECK** If any questions have less than one answer, disable save changes - showw error is possible
   * Anywhere between 2 and 6 answers, that each contain the answer as a string

#### 2.3.1. Starting a game
 * When start, redirect to loading page, shows players
 * Add in ui stff

#### 2.3.2. Stopping a game
 * When the game is stopped, a popup appears that prompts the admin "Would you like to view the results?" If they click yes, they are taken to the screen described in `2.3.3`

#### 2.3.3. Getting the results of a game
 * A unique route must exist for this screen that is parameterised on the session ID
 * Once the screen loads, it should display the following:
    OUTPUT: {

    }
   * Table of up to top 5 users and their score
   * **NO TIME FOR THIS**  Bar/Line chart showing a breakdown of what percentage of people (Y axis) got certain questions (X axis) correct
   * **NO TIME FOR THIS** Some chart showing the average response/answer time for each question
   * **NO TIME FOR THIS**  Any other interesting information you see fit

### 2.4. Feature 4. Player able to join and play game (12% for solo, 10% for pairs)

#### 2.4.1. Play Join


#### 2.4.2. Play Game
 * The answer shall be sent to the server the moment the user starts making selections. If further selections are modified, more requests are sent

#### 2.4.3. Game Results
 * After the final question is answered, a page is displayed showing the key results:
   * The player's performance in each question

### 2.5. Advanced Features (0% for solo, 10% for pairs)

#### 2.5.1. Game Upload
 * For `2.2.1`, when a new game is created, the user can optionally upload a .csv or .json (you choose) file containing the full data for a game. The data structure is validated on the frontend before being passed to the backend normally. You should provide a copy of an example data file in your project repo ()
 * If you implement this feature, you must attach an example .csv or .json into your repo in the project folder. This file must have name `2.5.json`  or `2.5.csv`. This is so we can actually test that it works while marking.

#### 2.5.2. Lobby
 * If a quiz is active, but has yet to move into position 0 (i.e. is still in position -1), then a player lives in a state of limbo. Construct a "lobby" screen that is pleasant and entertaining for users while they await for the quiz to begin.

#### 2.5.3. Past quiz results
 * Allow admins to access a page whereby they can see a list of previous sessions for a quiz, and then view results for those previous sessions as well.
 
#### 2.5.4. Points system
 * Devise a more advanced points system whereby a player's score if the product of the time taken to complete a question (i.e. speed) and the number of points a question is worth.You can 
 * This points system should be explained (in writing) on the results screen for both admins and players.
