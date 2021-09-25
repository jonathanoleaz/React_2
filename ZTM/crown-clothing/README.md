To deploy in Heroku, please refer to the following post so that the repository is notas shown in the course:

https://stackoverflow.com/questions/13756055/why-cant-i-push-this-up-to-date-git-subtree/15623469#15623469

Step 1) git subtree split --prefix pythonapp master
Step 2) Using the token given in the step 1:
        git push heroku 157a66d050d7a6188f243243264c765f18bc85fb956:master --force