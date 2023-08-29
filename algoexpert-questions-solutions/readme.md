# How to Use

- Before doing anything you have to login to AlgoExpert and get your authorization token.
- Once this is done you can either look for questions list (which generally is fetched from the server when you enter the site). Alternatively you can run `fetch-question-list.ps1` to download it. You'll need to enter the token in order to have this run successfully.
- Next, you'll use `process-question-list.ps1` which will create the Solutions folder and add a definition and a solutions `json` file for each question.
At this point you'll want to run `process-to-files.ps1` in order to generate the markdown documents with the code solutions and the prompt for each question.

> In order to process the a* algorithm problem use `process-to-a-algorithm.ps1`. However, first rename the `uid` in the `question-urls-list.json`.

> To test a single file output you can use `.\process-to-file.ps1 -QuestionId airport-connections`.

## Build up the media file titles

Use `write-file-names.ps1`